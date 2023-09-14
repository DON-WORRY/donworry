import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';
// 알림 전송

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

export function NotificationSend() {
  axiosWithAuth.post('/api/notification');
}
// 알림 조회
export function NotificationInquiry() {
  const id = getData('memberId');
  axiosWithAuth.get(`/api/notification/${id}`);
}
// 알림 삭제
export function NotificationDelete() {
  axiosWithAuth.delete('/api/notification');
}
