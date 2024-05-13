import React, { useState, useEffect, useCallback } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

const Chat = ({ route, db }) => {
  const { name, color } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesFirestore = querySnapshot.docs.map(doc => {
        // Check if createdAt exists and is not null before converting
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
    });

    return () => unsubscribe();  // Cleanup on unmount
  }, [db]);

  const onSend = useCallback((messages = []) => {
    messages.forEach(message => {
      addDoc(collection(db, "messages"), {
        text: message.text,
        createdAt: serverTimestamp(), // Ensures the time is correct across different regions
        user: message.user,
        system: message.system || false
      });
    });
  }, [db]);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: color }} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,  // Static user ID for the example
          name: name
        }}
        renderUsernameOnMessage={true}
      />
    </KeyboardAvoidingView>
  );
};

export default Chat;
