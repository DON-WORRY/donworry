import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  accountCardDetail,
  accountPerMonthAsset,
  accountSetGoal,
  accountGoalInquiry,
  accountAssetRankInquiry,
  accountCardList,
} from './AccountFunctions';

// transfer api
import { transfer } from './TransferFunctions';

// notification api
import {
  notificationSend,
  notificationInquiry,
  notificationDelete,
} from './NotificationFunctions';
// 값을 가져오기
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // 읽기 에러
    console.error(e);
    throw e;
  }
};
const TestScreen: React.FC = () => {
  // storage 저장 데이터
  // memberId : 로그인 pk : number
  // refreshToken : 토큰 : string

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
  // userSignup(dataSignup);
  async function testHandle() {
    /*
    스토리지 저장 확인
    const memberId = await getData('memberId');
    const refreshToken = await getData('refreshToken');
    console.log(memberId);
    console.log(refreshToken);


    로그인 확인
    const data = {
      memberEmail: 'ga1754@naver.com',
      memberPassword: '123qwe123',
    };
    userLogin(data);


    카테고리별 소비내역 조회
    consumptionCategoryHistory(12)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });


    // ============================== 다시 점검해야함 =================================
    카테고리별 소비합계 실행할것.
        consumptionCategoryTotal()
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });


    더치페이 조회 확인
    consumptionDutchPayInquiry();
    {"code": "OK", "data": [{"dutchpayReceivedPrice": 3, "dutchpayReqPrice": 10, "dutchpayStatus": "COMPLETE", "name": "김동현"}], "status": 200}
    


    더치페이 요청
    type DutchPayRequestData = {
      id: number;
      reqAmountList: ReqAmountRequest[];
    };
    type ReqAmountRequest = {
      memberId : number,
      price : number,
    }

    const data = {
      consumptionId: 6,
      friendId: 2,
      price: 9900,
    };
    consumptionDutchPayRequest(data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });


      더치페이 친구 완료
          consumptionDutchPayComplete(1, 2)
      .then((res) => console.log(res))
      .catch((e) => {
        console.error(e);
      });

      더치페이 전체 완료
      consumptionDutchPayAllComplete(2)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });



      카드별 소비내역
      accountCardHistory()
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });


      상세카드 소비내역
      accountCardDetail(2)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });

      사용자 카드 불러오기
      accountCardList()
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });


    */
    // 테스트 하는 부분
    // =========================
    // 테스트 스크린 함수 끝부분
  } // ========================
  // 테스트 스크린 함수 끝부분
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
          testHandle();
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
