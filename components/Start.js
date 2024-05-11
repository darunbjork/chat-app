// Start.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#FFF'); // Default color

  const colors = ['#B9C6AE', '#8A95A5', '#474056', '#090C08']; // Example colors

  return (
    <ImageBackground 
      source={require('../assets/Background Image.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <Text style={styles.title}>Hello! Enter your name and choose a color to start chatting.</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
          />
          <View style={styles.colorSelection}>
            {colors.map((itemColor) => (
              <TouchableOpacity
                key={itemColor}
                style={[styles.colorButton, { backgroundColor: itemColor }]}
                onPress={() => setColor(itemColor)}
              />
            ))}
          </View>
          <Button
            title="Go to Chat"
            onPress={() => navigation.navigate('Chat', { name, color })}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center', // Centers vertically
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 20,
    width: '90%',
    maxWidth: 600,
    alignSelf: 'center',
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    elevation: 10,
  },
  title: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
  },
  colorSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  }
});

export default Start;
