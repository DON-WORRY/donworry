import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import SignupHeader from '../components/signups/SignupHeader';
import SignupMiddleInput from '../components/signups/SignupMiddleInput';
import SignupBottomInput from '../components/signups/SignupBottomInput';
import SignupPrivacyAgreement from '../components/signups/SignupPrivacyAgreement';
import SignupBtn from '../components/signups/SignupBtn';

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [certificationNumber, setCertificationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userBirth, setUserBirth] = useState('');

  function signupOper() {
    console.log([
      email,
      certificationNumber,
      password,
      checkPassword,
      userName,
      userGender,
      userBirth,
    ]);
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <SignupHeader />
      <SignupMiddleInput
        setEmail={setEmail}
        setCertificationNumber={setCertificationNumber}
        setPassword={setPassword}
        setCheckPassword={setCheckPassword}
      />
      <SignupBottomInput
        setUserName={setUserName}
        setUserGender={setUserGender}
        setUserBirth={setUserBirth}
      />
      <SignupPrivacyAgreement />
      <SignupBtn signupOper={signupOper} />
    </KeyboardAvoidingView>
  );
};

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    backgroundColor: 'white',
    height: screenHeight,
    width: screenWidth,
  },
});

export default SignupScreen;
