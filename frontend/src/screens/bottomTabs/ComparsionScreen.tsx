import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ComparisonChart from '../../components/comparisons/ComparisonChart';
function ComparisonScreen() {
  return (
    <View style={styles.container}>
      <Text>Comparison Screen</Text>
      <ComparisonChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default ComparisonScreen;
