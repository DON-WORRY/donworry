import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';

// 계좌 이체
export function transfer(): Promise<void> {
  return axiosWithAuth
    .post('/api/transfer')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
