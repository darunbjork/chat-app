import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';

import Start from './components/Start';
import Chat from './components/Chat';

const firebaseConfig = {
  apiKey: "AIzaSyAxORAtmc5NIqoQlpW4mdL8SKWTa2AS_FE",
  authDomain: "chatapp-217c0.firebaseapp.com",
  projectId: "chatapp-217c0",
  storageBucket: "chatapp-217c0.appspot.com",
  messagingSenderId: "759429416236",
  appId: "1:759429416236:web:4b2d0249be10029c215889"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" options={({ route }) => ({ title: route.params.name })}>
          {props => <Chat {...props} db={db} isConnected={connectionStatus.isConnected} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
