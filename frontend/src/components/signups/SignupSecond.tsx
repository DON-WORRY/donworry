import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const SignupSecond: React.FC = () => {
  return <View style={styles.container}></View>;
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.8,
    width: screenWidth,
  },
});

export default SignupSecond;
