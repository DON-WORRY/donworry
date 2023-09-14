import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';
// 카테고리별 소비합계

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
  }
};
export function consumptionCategoryTotal() {
  const id = getData('memberId');
  axiosWithAuth.get(`/api/consumption/total/${id}`);
}
// 카테고리별 소비내역
export function consumptionCategoryHistory() {
  const id = getData('memberId');
  axiosWithAuth.get(`/api/consumption/history/${id}`);
}
// 카테고리 변경
export function consumptionCategoryModify() {
  axiosWithAuth.put('/api/consumption/modify');
}
// 더치페이 조회
export function consumptionDutchPayInquiry() {
  const id = getData('memberId');
  axiosWithAuth.get(`/api/dutchpay/${id}`);
}
// 더치페이 요청
export function consumptionDutchPayRequest() {
  axiosWithAuth.post('/api/dutchpay/create');
}
// 더치페이 완료
export function consumptionDutchPayComplete() {
  const id = getData('memberId');
  axiosWithAuth.put(`/api/dutchpay/complete/${id}`);
}
// 더치페이 전체완료
export function consumptionDutchPayAllComplete() {
  const id = getData('memberId');
  axiosWithAuth.post(`/api/dutchpay/complete/${id}`);
}
