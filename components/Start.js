import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
    <ImageBackground 
      source={require('../assets/Background Image.png')} 
      style={styles.background}
      resizeMode="cover"  // Ensures the background covers the whole View
    >
      <View style={styles.container}>
        <Text>Hello! Enter your name to start chatting.</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}  // Updates the name state on text change
          placeholder='Type your username here'
        />
        <Button
          title="Go to Chat"
          onPress={() => navigation.navigate('Chat', { name })}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Semi-transparent background for better readability
    width: '90%',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  textInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20
  }
});

export default Start;
