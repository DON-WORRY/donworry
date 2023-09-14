import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';

// 스토리지에서 데이터 가져오기
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // 읽기 에러
    console.error(e);
  }
};

// 회원정보 조회
export function mypageMemberInquiry(): Promise<void> {
  const id = getData('memberId');
  return axiosWithAuth
    .get(`/api/mypage/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 회원정보 수정
export function mypageMemberModify(): Promise<void> {
  return axiosWithAuth
    .put('/api/mypage/modify')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 비밀번호 재설정
export function mypagePasswordReset(): Promise<void> {
  return axiosWithAuth
    .put('/api/mypage/reset')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 회원탈퇴
export function mypageWithdrawal(): Promise<void> {
  return axiosWithAuth
    .delete('/api/mypage/leave')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
