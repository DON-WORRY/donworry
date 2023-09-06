import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const SignupHeader: React.FC = () => {
  const blueLogo = require('../../assets/logo/BlueLogo.png');
  return (
    <View style={styles.container}>
      <Image style={styles.signupLogo} source={blueLogo} />
      <Text style={styles.signupText}>DON WORRY</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  signupLogo: {
    width: Dimensions.get('screen').width * 0.5,
    height: Dimensions.get('screen').width * 0.5,
  },
  signupText: {
    fontFamily: "Oswald"
  },
});
export default SignupHeader;
