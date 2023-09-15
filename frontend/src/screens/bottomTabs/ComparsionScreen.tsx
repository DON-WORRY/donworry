import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

function ComparisonScreen() {
  return (
    <View style={styles.container}>
      <Text>Comparison Screen</Text>
      <Svg width="200" height="200" viewBox="0 0 100 100">
        <Polygon
          points="50,3 97,25 95,75 50,99 3,75 3,25"
          fill="none"
          stroke="blue"
          strokeWidth="2"
        />
        <Polygon
          points="25,50 3,97 25,95 75,50 99,3 75,6"
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </Svg>
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

export default ComparisonScreen;
