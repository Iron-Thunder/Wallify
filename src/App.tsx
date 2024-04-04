import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainScreen from './Pages/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartScreen from './Pages/StartScreen';
import {JSX} from 'react/jsx-runtime';
import DetailScreen from './Pages/DetailScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={StartScreen} />
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
