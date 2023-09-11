import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeAsset: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>자산</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeAsset;
