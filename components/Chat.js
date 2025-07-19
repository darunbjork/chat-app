import React, { useState, useEffect, useCallback } from 'react';
import { View, Platform, KeyboardAvoidingView, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { GiftedChat, InputToolbar, Actions } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useActionSheet } from '@expo/react-native-action-sheet';
import MapView from 'react-native-maps';
export const generateReference = (uri) => {
  const timeStamp = new Date().getTime();
  const imageName = uri.split("/").pop();
  return `${timeStamp}-${imageName}`;
};

const Chat = ({ route, db, storage, isConnected }) => {
  const { name, color } = route.params;
  const [messages, setMessages] = useState([]);
  const { showActionSheetWithOptions } = useActionSheet();

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem('messages');
    if (cachedMessages) {
      try {
        const parsedMessages = JSON.parse(cachedMessages);
        const messagesWithDates = parsedMessages.map((msg) => ({
          ...msg,
          createdAt: msg.createdAt ? new Date(msg.createdAt) : new Date(),
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.log('Failed to load cached messages:', error.message);
      }
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
            text: doc.data().text || '',
            createdAt: createdAt,
            user: doc.data().user,
            system: doc.data().system || false,
            image: doc.data().image || null,
            location: doc.data().location || null,
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

  const onSend = useCallback((newMessages = []) => {
    if (!Array.isArray(newMessages)) {
      newMessages = [newMessages];
    }
    newMessages.forEach(message => {
      addDoc(collection(db, "messages"), {
        text: message.text || '',
        createdAt: serverTimestamp(),
        user: message.user,
        system: message.system || false,
        image: message.image || null,
        location: message.location || null,
      });
    });
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }, [db]);

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  const onActionPress = () => {
    const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    showActionSheetWithOptions(
      { options, cancelButtonIndex },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
            return;
        }
      }
    );
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
      if (!result.canceled) {
        const imageURI = result.assets[0].uri;
        await uploadAndSendImage(imageURI);
      }
    } else {
      Alert.alert("Permissions haven't been granted.");
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        const imageURI = result.assets[0].uri;
        await uploadAndSendImage(imageURI);
      }
    } else {
      Alert.alert("Permissions haven't been granted.");
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend([{
          _id: Math.random().toString(36).substr(2, 9), // Add unique id for location message
          text: '',
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
          createdAt: new Date(),
          user: {
            _id: 1,
            name: name,
          },
        }]);
      }
    } else {
      Alert.alert("Permissions haven't been granted.");
    }
  };

  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend([{
        _id: Math.random().toString(36).substr(2, 9), // Add unique id for image message
        text: '',
        image: imageURL,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: name,
        },
      }]);
    });
  };


  const renderCustomActions = (props) => (
    <Actions
      {...props}
      options={{
        'Choose From Library': pickImage,
        'Take Picture': takePhoto,
        'Send Location': getLocation,
        'Cancel': () => { },
      }}
      icon={() => (
        <View style={styles.actionButton}>
          <Text style={styles.actionButtonText}>+</Text>
        </View>
      )}
      onSend={args => console.log(args)}
    />
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: color }} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: 1, name: name }}
        renderUsernameOnMessage={true}
        renderInputToolbar={renderInputToolbar}
        renderCustomView={renderCustomView}
        renderActions={renderCustomActions}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Chat;
