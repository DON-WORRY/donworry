import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AssetScreen() {
  return (
    <View style={styles.container}>
      <Text>Asset Screen</Text>
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

export default AssetScreen;
