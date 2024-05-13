import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" options={({ route }) => ({ title: route.params.name })}>
          {props => <Chat {...props} db={db} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
