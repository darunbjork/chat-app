import React, { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;

  // Set up the navigation bar title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: { backgroundColor: color },
    });
  }, [navigation, name, color]);

  // Determine text color based on background color
  const textColor = color === '#090C08' || color === '#474056' ? 'white' : 'black';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color }}>
      <Text style={{ color: textColor }}>Welcome to the Chat!</Text>
    </View>
  );
}

export default Chat;