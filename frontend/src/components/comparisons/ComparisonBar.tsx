import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface ComparisonBarProps {
    categoryName: string
    myValue: number
    friendsValue: number
}

const ComaprisonBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <View></View>
      <View></View>
      <View></View>
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
    height: 100,
    width: screenWidth - 40,
  },
});

export default ComaprisonBar;
