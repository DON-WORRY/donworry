import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Test from './components/test';
import SignupScreen from './screens/SignupScreen';
const App: React.FC = () => {
  return (
    // <View style={styles.container}>
    //   <Text>my first react Native</Text>
    //   <Test/>
    //   <SignupScreen />
    //   <StatusBar style="auto" />
    // </View>
    <SignupScreen />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
  },
});

export default App;
