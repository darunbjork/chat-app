import React, { useState, useEffect, useCallback } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

const Chat = ({ route, db, isConnected }) => {
  const { name, color } = route.params;
  const [messages, setMessages] = useState([]);

  // Cache messages locally
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Load cached messages
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages');
    if (cachedMessages) {
      setMessages(JSON.parse(cachedMessages));
    }
  };

  useEffect(() => {
    let unsubscribe;
    if (isConnected) {
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesFirestore = querySnapshot.docs.map(doc => {
          const createdAt = doc.data().createdAt ? new Date(doc.data().createdAt.toDate()) : new Date();
          return {
            _id: doc.id,
            text: doc.data().text,
            createdAt: createdAt,
            user: doc.data().user,
            system: doc.data().system || false
          };
        });
        setMessages(messagesFirestore);
        cacheMessages(messagesFirestore);
      });
    } else {
      loadCachedMessages();
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isConnected]);

  const onSend = useCallback((messages = []) => {
    messages.forEach(message => {
      addDoc(collection(db, "messages"), {
        text: message.text,
        createdAt: serverTimestamp(),
        user: message.user,
        system: message.system || false
      });
    });
  }, [db]);

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: color }} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: 1, name: name }}
        renderUsernameOnMessage={true}
        renderInputToolbar={renderInputToolbar}
      />
    </KeyboardAvoidingView>
  );
};

export default Chat;
