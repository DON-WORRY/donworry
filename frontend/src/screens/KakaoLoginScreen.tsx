import React from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { APP_ENV_KAKAO_API_KEY, APP_ENV_REDIRECT_URI } from '@env';
import { axiosWithoutAuth } from '../axios/http';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 토큰 저장하기
const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

const URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${APP_ENV_KAKAO_API_KEY}&redirect_uri=${APP_ENV_REDIRECT_URI}&lang=ko`;
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    replace: (screen: string, params?: any) => void;
  };
}

type KakaoType = {
  email: string
  gender: string;
  nickname: string;
  oauthProvider: string;
};

type RootStackParamList = {
  KakaoSignup: {
    kakao: KakaoType;
  };
};

const KakaoLogin: React.FC = () => {
  const navigationLogin = useNavigation<ScreenProps['navigation']>();
  const navigationSignup =
    useNavigation<StackNavigationProp<RootStackParamList, 'KakaoSignup'>>();
  const getCode = (target: string) => {
    const exp = 'code=';
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      // requestToken(requestCode);
      // navigation.replace('TabNavigation', { screen: 'Home' });
      // console.log(requestCode);

      const data = {
        kakaoAuthToken: requestCode,
      };
      axiosWithoutAuth
        .post('https://j9c210.p.ssafy.io/api/oauth/kakao', data)
        .then((r) => {
          console.log(r.data.data);
          const farams = r.data.data;
          if (farams.accessToken !== undefined) {
            // 로그인 과정이 오래 걸림
            navigationLogin.replace('TabNavigation', { screen: 'Home' });
            // 토큰 저장
            const accessToken = farams.accessToken
            const memberEmail = farams.memberEmail;
            const memberId = farams.memberId.toString();
            const memberName = farams.memberName;
            const memberRole = farams.memberRole;
            const refreshToken = farams.refreshToken;
            const memberBirthDate = farams.memberBirthDate;
            const memberGender = farams.memberGender;
      
            storeData('accessToken', accessToken);
            storeData('memberEmail', memberEmail);
            storeData('memberId', memberId);
            storeData('memberName', memberName);
            storeData('memberRole', memberRole);
            storeData('refreshToken', refreshToken);
            storeData('memberBirthDate', memberBirthDate);
            storeData('memberGender', memberGender);
          } else {
            navigationSignup.navigate('KakaoSignup', {kakao: farams});
          }
        })
        .catch((e) => {
          console.error(e.response.data);
        });
    }
  };
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;

  return (
    <>
      <View
        style={{
          flex: 1,
          width: screenWidth,
          height: screenHeight,
          backgroundColor: 'white',
          paddingTop: 100,
        }}
      >
        <WebView
          style={{ flex: 1 }}
          source={{
            uri: URI,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={(event) => {
            console.log('Received message:', event.nativeEvent);
            const data = event.nativeEvent.url;
            getCode(data);
          }}
        />
      </View>
    </>
  );
};

export default KakaoLogin;
