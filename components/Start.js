import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20
  }
});

export default Start;
