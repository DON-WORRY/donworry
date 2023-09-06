import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SignupHeader from '../components/signups/SignupHeader';
import SignupMiddleInput from '../components/signups/SignupMiddleInput';
import SignupBottomInput from '../components/signups/SignupBottomInput';
import SignupPrivacyAgreement from '../components/signups/SignupPrivacyAgreement';
import SignupBtn from '../components/signups/SignupBtn';

const SignupScreen: React.FC = () => {
  return (
    <View>
      <SignupHeader />
      <View></View>
    </View>
  );
};
export default SignupScreen;
