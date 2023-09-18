import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LootNavigator from './navigations/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './store/Store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <LootNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
