import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeSpend: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>소비 -1,050,400</Text>
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

export default HomeSpend;
