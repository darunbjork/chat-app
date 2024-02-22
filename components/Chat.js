import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
  // Extracting parameters from the navigation route
  const { name, color } = route.params;

  // State to manage chat messages
  const [messages, setMessages] = useState([]);

  // Use layout effect to set up the navigation bar title and style
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: { backgroundColor: color },
      headerTintColor: getTextColor(color), // Set text color based on luminance
    });
  }, [navigation, name, color]);

  // Determine text color based on background color
  const textColor = color === '#090C08' || color === '#474056' ? 'white' : 'black';

  // Initialize messages state with static messages
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

    // Cleanup function to unsubscribe from the snapshot listener
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [db]);

  // Function to render customized speech bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000', // Black color for sender's speech bubble
          },
          left: {
            backgroundColor: '#FFF', // White color for receiver's speech bubble
          },
        }}
      />
    );
  };

  // Function to handle sending new messages
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  // Function to determine text color based on background color luminance
  const getTextColor = (bgColor) => {
    const hexColor = bgColor.replace(/^#/, '');
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // If the background is light, return black; otherwise, return white
    return luminance > 0.5 ? 'black' : 'white';
  };

  // Render the chat component
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
      />
    </View>
  );
};

export default Chat;
