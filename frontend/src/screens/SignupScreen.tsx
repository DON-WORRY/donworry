import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SignupHeader from '../components/signups/SignupHeader';
import SignupMiddleInput from '../components/signups/SignupMiddleInput';
import SignupBottomInput from '../components/signups/SignupBottomInput';
import SignupPrivacyAgreement from '../components/signups/SignupPrivacyAgreement';
import SignupBtn from '../components/signups/SignupBtn';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    replace: (screen: string, params?: any) => void;
  };
}
const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isCertificated, setIsCertificated] = useState(false)
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userBirth, setUserBirth] = useState('');

  const navigation = useNavigation<ScreenProps['navigation']>();

  function signupOper() {
    const newBirth =
      userBirth.slice(0, 4) +
      '-' +
      userBirth.slice(4, 6) +
      '-' +
      userBirth.slice(6, 8);
    console.log([
      email,
      isCertificated,
      password,
      checkPassword,
      userName,
      userGender,
      newBirth,
    ]);
    navigation.navigate('Login');
  }
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <SignupHeader />
      <SignupMiddleInput
        setEmail={setEmail}
        setPassword={setPassword}
        setCheckPassword={setCheckPassword}
        setIsCertificated={setIsCertificated}
      />
      <SignupBottomInput
        setUserName={setUserName}
        setUserGender={setUserGender}
        setUserBirth={setUserBirth}
      />
      <SignupPrivacyAgreement />
      <SignupBtn signupOper={signupOper} />
    </KeyboardAwareScrollView>
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
