import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function FriendScreen() {
  return (
    <View style={styles.container}>
      <Text>Friend Screen</Text>
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

export default FriendScreen;
