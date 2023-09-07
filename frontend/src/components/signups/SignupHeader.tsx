import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const SignupHeader: React.FC = () => {
  const blueLogo = require('../../assets/logo/BlueLogo.png');
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.signupLogo} source={blueLogo} />
        <View style={styles.middleContainer}>
          <Text style={styles.signupText}>DON</Text>
          <Text style={styles.signupText}>WORRY</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  middleContainer: {
    flexDirection: 'row',
  },
  signupLogo: {
    width: Dimensions.get('screen').width * 0.25,
    height: Dimensions.get('screen').width * 0.25,
  },
  signupText: {
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
  },
});
export default SignupHeader;
