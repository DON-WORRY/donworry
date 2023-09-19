import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';

type CategoryModifyData = {
  id: number;
  name: string;
};

type DutchPayRequestData = {
  id: number;
  price: number;
};

type DutchPayCompeleteData = {
  dutchPayId: number;
};

type DutchPayAllCompleteData = {
  dutchPayId: number;
};

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

// 카테고리별 소비합계
export function consumptionCategoryTotal(): Promise<void> {
  const id = getData('memberId');
  return axiosWithAuth
    .get(`/api/consumption/total/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 카테고리별 소비내역
export function consumptionCategoryHistory(): Promise<void> {
  const id = getData('memberId');
  return axiosWithAuth
    .get(`/api/consumption/history/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 카테고리 변경
export function consumptionCategoryModify(
  data: CategoryModifyData
): Promise<void> {
  return axiosWithAuth
    .put('/api/consumption/modify', data)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 더치페이 조회
export function consumptionDutchPayInquiry(): Promise<void> {
  const id = getData('memberId');
  return axiosWithAuth
    .get(`/api/dutchpay/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 더치페이 요청
export function consumptionDutchPayRequest(
  data: DutchPayRequestData
): Promise<void> {
  return axiosWithAuth
    .post('/api/dutchpay/create', data)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 더치페이 완료
export function consumptionDutchPayComplete(
  data: DutchPayCompeleteData
): Promise<void> {
  const id = getData('memberId');
  return axiosWithAuth
    .put(`/api/dutchpay/complete/${id}`, data)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 더치페이 전체완료
export function consumptionDutchPayAllComplete(
  data: DutchPayAllCompleteData
): Promise<void> {
  const id = getData('memberId');
  return axiosWithAuth
    .post(`/api/dutchpay/complete/${id}`, data)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
