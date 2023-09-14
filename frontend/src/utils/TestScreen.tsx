import React from 'react';
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
    friendDelete
} from "./FriendFunctions"



const TestScreen: React.FC = () => {
    // 함수 실행
    // 회원가입 => 로그인 => 함수 => 회원탈퇴 순서
    
  return <View></View>;
};

export default TestScreen;
