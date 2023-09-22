import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import MyPageClose from './MyPageClose';
import MypageOpen from './MypageOpen';
import MyPageMenu from './MyPageMenu';
import { useSelector } from 'react-redux';

interface RootState {
  Modal: {
    mypageModal: boolean;
  };
}
const MyPage: React.FC = () => {
  const clickView = useSelector((state: RootState) => state.Modal.mypageModal);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.innerContainer}>
        {clickView ? <MypageOpen /> : <MyPageClose />}
        <HorizonLine />
        <View>
          <MyPageMenu imageName="bell" text="내소식" />
          <MyPageMenu imageName2="piggy-bank" text="계좌선택" />
          <MyPageMenu imageName="send" text="송금하기" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const HorizonLine = () => {
  return <View style={styles.horizontalLine}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalLine: {
    borderBottomColor: 'black', // 가로선의 색상 설정
    borderBottomWidth: 2, // 가로선의 두께 설정
    marginVertical: 10, // 위아래 여백 설정 (선택 사항)
  },
  innerContainer: {
    height: 400,
  },
});

export default MyPage;
