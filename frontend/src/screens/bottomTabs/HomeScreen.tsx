import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HomeAsset from '../../components/homes/HomeAsset';
import HomeSpend from '../../components/homes/HomeSpend';
import HomeCardSpend from '../../components/homes/HomeCardSpend';


const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <HomeAsset />
      <HomeSpend />
      <HomeCardSpend />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
