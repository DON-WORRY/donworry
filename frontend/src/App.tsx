import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigations/Stack';

import SignupScreen from './screens/SignupScreen';
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
