import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userSignup } from '../utils/UserFunctions';

import Modal from '../components/modals/Modal';

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
const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isCertificated, setIsCertificated] = useState(false);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      isChecked,
    ]);

    if (isCertificated) {
      if (isChecked) {
        // if ()
        navigation.navigate('Login');
      }
      return alert('개인정보수집 동의에 체크해주세요.');
    }
    return alert('이메일 인증을 해주세요.');
  }
  return (
    <>
      {isLoading ? (
        <Modal />
      ) : (
        <KeyboardAwareScrollView style={styles.container}>
          <SignupHeader />

          <SignupMiddleInput
            setEmail={setEmail}
            email={email}
            setPassword={setPassword}
            setCheckPassword={setCheckPassword}
            checkPassword={checkPassword}
            setIsCertificated={setIsCertificated}
            password={password}
            isCertificated={isCertificated}
            setIsLoading={setIsLoading}
          />

          <SignupBottomInput
            setUserName={setUserName}
            userName={userName}
            setUserGender={setUserGender}
            setUserBirth={setUserBirth}
            userBirth={userBirth}
          />

          <SignupPrivacyAgreement setIsChecked={setIsChecked} />
          <SignupBtn signupOper={signupOper} />
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

export default SignupScreen;
