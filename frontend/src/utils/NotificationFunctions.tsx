import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';

// 데이터 가져오기
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

// 알림 전송
export function notificationSend(): Promise<void> {
  return axiosWithAuth
    .post('/api/notification')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
    });
}
// 알림 조회
export function notificationInquiry(): Promise<void> {
  const id = getData('memberId');
  return axiosWithAuth
    .get(`/api/notification/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 알림 삭제
export function notificationDelete(): Promise<void> {
  return axiosWithAuth
    .delete('/api/notification')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
