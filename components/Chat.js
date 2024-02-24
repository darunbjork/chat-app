// Chat.js

import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, Platform, Image, Alert } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db }) => {
  const { name, color } = route.params;
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: { backgroundColor: 'white' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerTitleAlign: 'center',
      headerStatusBarHeight: Platform.OS === 'ios' ? 20 : 0,
      headerStatusBarStyle: 'dark-content',
    });
  }, [navigation, name]);

  const textColor = color === '#090C08' || color === '#474056' ? 'white' : 'black';

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          _id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [db]);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;

    if (currentMessage.location) {
      return (
        <View>
          <Image
            style={{ width: 200, height: 200, borderRadius: 13, margin: 3 }}
            source={{ uri: currentMessage.location }}
          />
        </View>
      );
    }

    return null;
  };

  const onSend = async (newMessages = []) => {
    const message = newMessages[0];

    if (message.image || message.location) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${message._id}`);

        if (message.image) {
          const response = await fetch(message.image);
          const blob = await response.blob();
          await uploadBytes(storageRef, blob);
        }

        if (message.location) {
          const { longitude, latitude } = message.location;
          // Save the location data directly to Firestore or handle as needed
          await addDoc(collection(db, 'locations'), {
            longitude,
            latitude,
            createdAt: serverTimestamp(),
          });
        }

        // Update the message with the uploaded image URL
        const downloadURL = await getDownloadURL(storageRef);
        message.image = downloadURL;

        // Add the updated message to Firestore
        await addDoc(collection(db, 'messages'), message);
      } catch (error) {
        Alert.alert('Error sending message', error.message);
      }
    } else {
      // For regular text messages
      addDoc(collection(db, 'messages'), message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: color }}>
      <Text style={{ color: textColor }}>Welcome to the Chat!</Text>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderCustomView={renderCustomView}
        renderActions={(props) => <CustomActions {...props} />}
      />
    </View>
  );
};

export default Chat;
