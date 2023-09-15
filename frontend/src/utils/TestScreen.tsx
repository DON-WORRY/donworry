import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

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


const sampleSignup = {
  email: "test@naver.com",
  password: "123123",
  name: "Lee",
  
}

const TestScreen: React.FC = () => {
  // 함수 실행
  // 회원가입 => 로그인 => 함수 => 회원탈퇴 순서
  const data = {
    email: "e@e.com",
    name: "",
    password: "",
    birthday: "",
    gender: ""
  }
  userSignup(data)

  return <></>;
};

export default TestScreen;
