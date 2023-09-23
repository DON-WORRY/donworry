import React from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { APP_ENV_KAKAO_API_KEY, APP_ENV_REDIRECT_URI } from '@env';
console.log(APP_ENV_KAKAO_API_KEY);
console.log(APP_ENV_REDIRECT_URI);
const URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${APP_ENV_KAKAO_API_KEY}&redirect_uri=${APP_ENV_REDIRECT_URI}&lang=ko`;
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
            console.log(data);
            getCode(data);
          }}
        />
      </View>
    </>
  );
};

export default KakaoLogin;
