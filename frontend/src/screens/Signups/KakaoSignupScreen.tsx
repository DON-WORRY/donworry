import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Checkbox from 'expo-checkbox';
// 불러오는 컴포넌트
import SignupHeader from '../../components/signups/SignupHeader';
import SignupSecond from '../../components/signups/SignupSecond';
import SignupThird from '../../components/signups/SignupThird';
import SignupEasyButton from '../../components/signups/SignupEasyButton';
import SignupBtn from '../../components/signups/SignupBtn';
// 회원가입 함수
import { userSignup } from '../../utils/UserFunctions';
// 로그인 페이지로 이동
import { useNavigation } from '@react-navigation/native';

type KakaoType = {
  email: string;
  gender: string;
  nickname: string;
  oauthProvider: string;
};

type RootStackParamList = {
  KakaoSignup: {
    kakao: KakaoType;
  };
};

type KakaoScreenProps = {
  route: RouteProp<RootStackParamList, 'KakaoSignup'>;
};

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    replace: (screen: string, params?: any) => void;
  };
}

const KakaoSignupScreen: React.FC<KakaoScreenProps> = ({ route }) => {
  // 파람스로 받은 데이터
  const email = route.params.kakao.email;
  const gender = route.params.kakao.gender;
  const name = route.params.kakao.nickname;
  const oauthProvider = route.params.kakao.oauthProvider;
  // 회원가입에 필요한 데이터
  const [userName, setUserName] = useState(name);
  const [easyPassword, setEasyPassword] = useState('');
  const [checkPrivacy, setCheckPrivacy] = useState(false);
  const [userBirth, setUserBirth] = useState('');
  // 회원가입 순서에 따른 이동
  const [pageData, setPageData] = useState({
    a: true,
    b: false,
    c: false,
  });
  //   포커스 잡힌 곳을 true로 해주려고 만든 상태관리
  const [whereFocus, setWhereFocus] = useState({
    name: false,
    birth: false,
  });
  //   회원가입이 유효한지 확인
  const [canSignup, setCanSignup] = useState(false);
  //   네비게이션 이동
  const navigation = useNavigation<ScreenProps['navigation']>();
  // 현재 입력한 생년월일이 유효한지 확인하는 함수
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

  //   회원가입 버튼 클릭시 작동
  function signupOper() {
    const newBirth =
      userBirth.slice(0, 4) +
      '-' +
      userBirth.slice(4, 6) +
      '-' +
      userBirth.slice(6, 8);

    if (checkPrivacy) {
      const trimName = userName.trim();
      if (trimName !== '') {
        if (isUserBirthValid(newBirth)) {
          const data = {
            memberName: trimName,
            memberEmail: email,
            memberPassword: '',
            memberGender: gender,
            memberBirthDate: newBirth,
            memberSimplePassword: easyPassword,
            memberOauthProvider: oauthProvider,
          };
          userSignup(data)
            .then((r) => {
              // 회원가입은 되는데 로그인 창으로 이동하는 시간이 오래 걸림
              navigation.navigate('Login');
            })
            .catch((e) => {
              console.log(e);
              return alert('유효하지 않습니다.');
            });
        } else {
          return alert('생년월일을 확인해주세요.');
        }
      } else {
        return alert('이름을 확인해주세요.');
      }
    } else {
      return alert('개인정보수집 동의에 체크해주세요.');
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {pageData.a ? (
        <>
          <SignupHeader />
          {/* 이메일 비활성화된 textInput*/}
          {/* 수정가능한 이름 */}
          {/* 생년월일 입력 */}
          {/* 개인정보 취급 방침 체크 */}

          <TextInput
            style={[
              stylesText.input,
              stylesText.inputFirst,
              stylesText.doneText,
            ]}
            value={'이메일 : ' + email}
            editable={false}
          />
          <TextInput
            style={[
              stylesText.input,
              stylesText.inputSecond,
              stylesText.doneText,
            ]}
            value={'성별 : ' + (gender == 'MALE' ? '남자' : '여자')}
            editable={false}
          />

          <TextInput
            style={[
              stylesText.input,
              stylesText.inputThird,
              whereFocus.name ? stylesText.isFocused : null,
            ]}
            placeholder="이름"
            value={userName}
            onChangeText={(text) => {
              setUserName(text);
            }}
            onFocus={() => {
              setWhereFocus({
                name: true,
                birth: false,
              });
            }}
            onBlur={() => {
              setWhereFocus({
                name: false,
                birth: false,
              });
            }}
            placeholderTextColor={
              setWhereFocus.name ? '#7777F3' : 'rgb(156, 156, 156)'
            }
          />
          <TextInput
            style={[
              stylesText.input,
              stylesText.inputFourth,
              whereFocus.birth ? stylesText.isFocused : null,
            ]}
            value={userBirth}
            placeholder="생년월일 8자리"
            onChangeText={(text) => {
              setUserBirth(text);
            }}
            onFocus={() => {
              setWhereFocus({
                name: false,
                birth: true,
              });
            }}
            onBlur={() => {
              setWhereFocus({
                name: false,
                birth: false,
              });
            }}
            placeholderTextColor={
              whereFocus.birth ? '#7777F3' : 'rgb(156, 156, 156)'
            }
          />

          <View style={stylesPrivacy.container}>
            <Checkbox
              style={stylesPrivacy.checkBox}
              color={checkPrivacy ? '#7777F3' : undefined}
              value={checkPrivacy}
              onValueChange={() => {
                setCheckPrivacy(!checkPrivacy);
                setCheckPrivacy(!checkPrivacy);
              }}
            />
            <Text>개인정보 수집 이용 동의</Text>
            <Text style={stylesPrivacy.cautionText}>(필수)</Text>
          </View>
          <SignupEasyButton setPageData={setPageData} canSignup={canSignup} />
          {canSignup ? (
            <>
              <SignupBtn signupOper={signupOper} />
            </>
          ) : (
            <></>
          )}
        </>
      ) : pageData.b ? (
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
    </KeyboardAwareScrollView>
  );
};

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 160,
    backgroundColor: 'white',
    height: screenHeight,
    width: screenWidth,
  },
});
// 프라이버시 콘테이너
const stylesPrivacy = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  checkBox: {
    marginRight: 5,
  },
  cautionText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
// 입력 콘테이너
const stylesText = StyleSheet.create({
  input: {
    width: screenWidth - 40,
    height: 50,
    borderColor: '#808080',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputFirst: {
    borderTopWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 50,
    borderBottomWidth: 0.5,
  },
  inputSecond: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  inputThird: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    fontSize: 18,
  },
  inputFourth: {
    borderTopWidth: 0.5,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  isFocused: {
    borderColor: '#7777F3',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    fontWeight: 'bold',
  },
  innerFocusedText: {
    fontWeight: 'bold',
  },
  doneText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#808080',
  },
});
export default KakaoSignupScreen;
