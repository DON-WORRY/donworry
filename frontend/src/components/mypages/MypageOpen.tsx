import React, { useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import MypageImage from './MypageImage';
import MypageText from './MypageText';
import MypageButton from './MyPageButton';

const MypageOpen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>000님의 정보</Text>
      <MypageImage style={styles.image} />
      <View style={styles.info_View}>
        <MypageText title="이름" content="나종현" />
        <MypageText title="생년월일" content="1998.01.13" />
        <MypageText title="이메일" content="i0364842@naver.com" />
        <MypageText title="전화번호" content="010-4064-3297" />
      </View>
      <View style={styles.info_Button}>
        <MypageButton
          title="수정하기"
          onPress={() => console.log('수정')}
          color="#7777F3"
        />
        <MypageButton
          title="로그아웃"
          onPress={() => console.log('로그아웃')}
          color="#FF0000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 35,
    fontWeight: '800',
    paddingRight: 30,
  },
  image: {
    borderRadius: 50,
    height: 100,
    width: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  info_View: {
    width: Dimensions.get('screen').width * 0.6,
  },
  info_Button: {
    width: Dimensions.get('screen').width * 0.4,
    marginTop: 20,
  },
});

export default MypageOpen;
