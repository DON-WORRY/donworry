import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import SignupHeader from '../components/signups/SignupHeader';
import SignupMiddleInput from '../components/signups/SignupMiddleInput';
import SignupBottomInput from '../components/signups/SignupBottomInput';
import SignupPrivacyAgreement from '../components/signups/SignupPrivacyAgreement';
import SignupBtn from '../components/signups/SignupBtn';

const SignupScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <SignupHeader />
      <SignupMiddleInput />
      <SignupBottomInput />
      <SignupPrivacyAgreement />
      <SignupBtn />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    backgroundColor: 'white',
  },
});

export default SignupScreen;
