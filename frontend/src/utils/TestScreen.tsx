import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

// user api
import {
  userSignup,
  userLogin,
  userSocialLogin,
  userFindPassword,
  userLogout,
} from './UserFunctions';

// mypage api
import {
  mypageMemberInquiry,
  mypageMemberModify,
  mypagePasswordReset,
  mypageWithdrawal,
} from './MyPageFunctions';

// friend api
import {
  friendListInquiry,
  friendRequest,
  friendAccept,
  friendReject,
  friendDelete,
} from './FriendFunctions';

// consumption api
import {
  consumptionCategoryTotal,
  consumptionCategoryHistory,
  consumptionCategoryModify,
  consumptionDutchPayInquiry,
  consumptionDutchPayRequest,
  consumptionDutchPayComplete,
  consumptionDutchPayAllComplete,
} from './ConsumptionFunctions';

// account api
import {
  accountTradeTotal,
  accountTradeHistory,
  accountCardTotal,
  accountCardHistory,
  accountCardListInquiry,
  accountPerMonthAsset,
  accountSetGoal,
  accountGoalInquiry,
  accountAssetRankInquiry,
} from './AccountFunctions';

// transfer api
import { transfer } from './TransferFunctions';

// notification api
import {
  notificationSend,
  notificationInquiry,
  notificationDelete,
} from './NotificationFunctions';


const TestScreen: React.FC = () => {
  // 함수 실행
  // 회원가입 => 로그인 => 함수 => 회원탈퇴 순서
  /*
  {
    "memberName": "string",
    "memberEmail": "string",
    "memberPassword": "pL?5ONLg0L#",
    "memberGender": "MALE",
    "memberBirthDate": "2023-09-15"
  } 

  {
  "memberEmail": "string",
  "memberPassword": "string"
}
  */
 const dataLogin = {
  memberEmail: 'ga1754@naver.com',
  memberPassword: '12341234',
 };
 const dataSignup = {
    memberEmail: 'ga1754@naver.com',
    memberName: '홍길동',
    memberPassword: '12341234',
    memberBirthDate: '2023-01-19',
    memberGender: 'MALE',
  };
  // userSignup(dataSignup);

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        // onPress={() => {
        //   userSignup(dataSignup)
        //     .then((res) => {
        //       console.log(res);
        //     })
        //     .catch((error) => {
        //       console.log(error)
        //       console.error('Signup error:', error);
        //     });
        // }}
        onPress={() => {
          userLogin(dataLogin)
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error)
              console.error('Login error:', error);
            });
        }}
      >
        <Text>함수 실행</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 200,
    color: 'white',
    backgroundColor: '#7777F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestScreen;
