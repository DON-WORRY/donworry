import React from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
// import { ENV_KAKAO_API_KEY, ENV_REDIRECT_URI } from "@env"

const REST_API_KEY = process.env.ENV_KAKAO_API_KEY;
const REDIRECT_URI = process.env.ENV_REDIRECT_URI;
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    replace: (screen: string, params?: any) => void;
  };
}

const KakaoLogin: React.FC = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  const getCode = (target: string) => {
    const exp = 'code=';
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      // requestToken(requestCode);
      // navigation.replace('TabNavigation', { screen: 'Home' });
      console.log(requestCode);
      navigation.navigate('Login');
    }
  };
  const REST_API_KEY = '6ef3e4850a7d806c33947b648f059446';
  const REDIRECT_URI = 'http://localhost:8081';
  // const REDIRECT_URI = 'http://localhost:19006';
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
          paddingTop: 200,
        }}
      >
        <WebView
          style={{ flex: 1 }}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&lang=ko`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={(event) => {
            // console.log('Received message:', event.nativeEvent);
            const data = event.nativeEvent.url;
            getCode(data);
          }}
        />
      </View>
    </>
  );
};

export default KakaoLogin;
