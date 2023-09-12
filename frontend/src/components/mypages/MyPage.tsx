import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import MyPageClose from './MyPageClose';
import MypageOpen from './MypageOpen';

const MyPage: React.FC = () => {
  const [clickView, setClickView] = useState(false);
  function openView() {
    setClickView(true);
  }
  function closeView() {
    setClickView(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      {clickView ? (
        <MypageOpen onClickViewClose={closeView} />
      ) : (
        <MyPageClose onClickViewOpen={openView} />
      )}
      <HorizonLine />
    </SafeAreaView>
  );
};

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
});

export default MyPage;
