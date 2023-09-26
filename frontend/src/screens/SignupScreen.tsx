import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userSignup } from '../utils/UserFunctions';

import Modal from '../components/modals/LoaderModal';

import SignupHeader from '../components/signups/SignupHeader';
import SignupMiddleInput from '../components/signups/SignupMiddleInput';
import SignupBottomInput from '../components/signups/SignupBottomInput';
import SignupPrivacyAgreement from '../components/signups/SignupPrivacyAgreement';
import SignupBtn from '../components/signups/SignupBtn';
import SignupEasyButton from '../components/signups/SignupEasyButton';
import SignupSecond from '../components/signups/SignupSecond';
import SignupThird from '../components/signups/SignupThird';

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
  const [easyPassword, setEasyPassword] = useState('');
  const [pageData, setPageData] = useState({
    a: true,
    b: false,
    c: false,
  });
  const [canSignup, setCanSignup] = useState(false);

  const navigation = useNavigation<ScreenProps['navigation']>();

  function MaleFemale(gender: string): string {
    if (gender === '남자') {
      return 'MALE';
    } else {
      return 'FEMALE';
    }
  }

  function isUserBirthValid(userBirth: string): boolean {
    // 정규 표현식을 사용하여 yyyy-mm-dd 형식의 문자열인지 확인
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(userBirth)) {
      return false;
    }

    const today = new Date();
    const [year, month, day] = userBirth.split('-').map(Number);

    // 길이가 10자인지 확인
    if (userBirth.length !== 10) {
      return false;
    }

    // 올해를 기준으로 이전인지 확인
    if (year >= today.getFullYear()) {
      return false;
    }

    // 월이 1부터 12 사이인지 확인
    if (month < 1 || month > 12) {
      return false;
    }

    // 일이 각 월의 날짜에 맞는지 확인
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      return false;
    }

    return true;
  }

  function signupOper() {
    const newBirth =
      userBirth.slice(0, 4) +
      '-' +
      userBirth.slice(4, 6) +
      '-' +
      userBirth.slice(6, 8);

    if (isCertificated) {
      if (isChecked) {
        if (password === checkPassword) {
          const trimName = userName.trim();
          if (trimName !== '') {
            if (userGender !== '성별') {
              if (isUserBirthValid(newBirth)) {
                setIsLoading(true);
                const newGender = MaleFemale(userGender);
                const data = {
                  memberName: trimName,
                  memberEmail: email,
                  memberPassword: password,
                  memberGender: newGender,
                  memberBirthDate: newBirth,
                  memberSimplePassword: easyPassword,
                  memberOauthProvider: 'NONE',
                };
                userSignup(data)
                  .then(() => {
                    setIsLoading(false);
                    navigation.navigate('Login');
                    return;
                  })
                  .catch((e) => {
                    console.log(e);
                    setIsLoading(false);
                    return alert('유효하지 않습니다.');
                  });
              } else {
                return alert('생년월일을 확인해주세요.');
              }
            } else {
              return alert('성별을 선택해주세요.');
            }
          } else {
            return alert('이름을 확인해주세요.');
          }
        } else {
          return alert('비밀번호가 틀렸습니다.');
        }
      } else {
        return alert('개인정보수집 동의에 체크해주세요.');
      }
    }
    return alert('이메일 인증을 해주세요.');
  }
  return (
    <>
      {isLoading ? (
        <Modal />
      ) : (
        <KeyboardAwareScrollView style={styles.container}>
          {pageData.a ? (
            <>
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

              <SignupPrivacyAgreement
                setIsChecked={setIsChecked}
                isChecked={isChecked}
              />
              <SignupEasyButton
                setPageData={setPageData}
                canSignup={canSignup}
              />
              {canSignup ? (
                <>
                  <SignupBtn signupOper={signupOper} />
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {pageData.b ? (
                <SignupSecond
                  setPageData={setPageData}
                  setEasyPassword={setEasyPassword}
                />
              ) : (
                <>
                  <SignupThird
                    setPageData={setPageData}
                    setEasyPassword={setEasyPassword}
                    easyPassword={easyPassword}
                    setCanSignup={setCanSignup}
                  />
                </>
              )}
            </>
          )}
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

export default SignupScreen;
