import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  accountSearchAccountList,
  accountTradeHistory,
  accountPerMonthAsset,
  accountCardHistory,
} from '../AccountFunctions';

const AccountController: React.FC = () => {
  function testHandle() {
    // 사용자 계좌내역 불러오기
    // accountSearchAccountList()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // res 값
    // {"code": "OK", "data": {"accounts": [], "total": 0}, "status": 200}
    // ===================================================================
    // ===================================================================
    // 사용자 계좌별 거래내역
    // params는 계좌 id값 pk값
    // accountTradeHistory(1)
    // [[[[[[[[[확인불가]]]]]]]]]
    // ===================================================================
    // ===================================================================
    // 월별 순 자산
    // accountPerMonthAsset()
    // [[[[[[[[[확인불가]]]]]]]]]
    console.log("========account========")
  }


  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        testHandle();
      }}
    >
      <Text style={styles.text}>AccountController</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 200,
    backgroundColor: '#7777F3',
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AccountController;
