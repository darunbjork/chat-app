// Chat.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, Platform, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route }) => {
  const { name, color } = route.params;  // Destructure name and color passed from Start.js
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "You have entered the chat",
        createdAt: new Date(),
        system: true,  // This will render it as a system message
      },
      {
        _id: 2,
        text: `Hello ${name}, welcome to the chat!`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      }
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: color }} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1, // Assume your user's ID is 1
          name: name, // Display the user's name in each message
        }}
        renderUsernameOnMessage={true} // Display the user's name above the message bubbles
        placeholder="Type your message here..."
        renderActions={() => (
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="More options"
            accessibilityHint="Lets you choose to send an image or your geolocation."
            onPress={() => {}}
            style={{ padding: 10 }}
          >
            <Text style={{ color: '#000' }}>+</Text>
          </TouchableOpacity>
        )}
      />
    </KeyboardAvoidingView>
  );
};

export default Chat;
