import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TestScreen from '../../utils/TestScreen';
function SpendScreen() {
  return (
    <View style={styles.container}>
      <Text>Spend Screen</Text>
      <TestScreen />
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

export default SpendScreen;
