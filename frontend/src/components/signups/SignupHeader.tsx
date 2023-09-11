import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const SignupHeader: React.FC = () => {
  const blueLogo = require('../../assets/logo/BlueLogo.png');
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.signupLogo} source={blueLogo} />
        <View style={styles.middleContainer}>
          <Text style={[styles.signupText, styles.signupFirstText]}>DON </Text>
          <Text style={styles.signupText}>WORRY</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
  },
  middleContainer: {
    flexDirection: 'row',
  },
  signupLogo: {
    width: Dimensions.get('screen').width * 0.2,
    height: Dimensions.get('screen').width * 0.2,
  },
  signupText: {
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
  },
  signupFirstText: {
    color: '#7777F3',
  },
});
export default SignupHeader;
