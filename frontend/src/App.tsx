import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LootNavigator from './navigations/LootNavigator';
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <LootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
