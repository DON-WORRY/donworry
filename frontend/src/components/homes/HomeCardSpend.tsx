import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeCardSpend: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>카드지출 -1,050,400</Text>
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

export default HomeCardSpend;
