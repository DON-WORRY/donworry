import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';

type CategoryModifyData = {
  consumptionId: number;
  consumptionCategoryId: number;
};

type DutchPayRequestData = {
  consumptionId: number;
  reqAmountList: {
    memberEmail: string;
    price: number;
  }[];
};
export { DutchPayRequestData };

interface ConsumptionDataProps {
  total(total: any): unknown;
  categoryHistoryResponseList: {
    bankName: string;
    detail: string;
    price: number;
    dateTime: string;
    id: number;
  }[];
}

// 값을 가져오기
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

// 카테고리별 소비합계
export async function consumptionCategoryTotal(month: number): Promise<void> {
  return axiosWithAuth
    .get(`/api/consumption/total?month=${month}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 카테고리별 소비내역
export async function consumptionCategoryHistory(
  id: number,
  month: number
): Promise<ConsumptionDataProps> {
  return axiosWithAuth
    .get(`/api/consumption/history/${id}?month=${month}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
export { ConsumptionDataProps };

// 카테고리 변경
export async function consumptionCategoryModify(
  data: CategoryModifyData
): Promise<void> {
  return axiosWithAuth
    .put('/api/consumption/modify', data)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 더치페이 조회
export async function consumptionDutchPayInquiry(): Promise<void> {
  const id = await getData('memberId');
  return axiosWithAuth
    .get(`/api/dutchpay/${id}`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 더치페이 요청
export async function consumptionDutchPayRequest(data: DutchPayRequestData) {
  // 받아온 memberId값이 string이기때문에 변환해줘야 한다.
  // parseInt(stringValue, 10)
  /*
  {
  "id": 0,
  "reqAmountList": [
    {
      "memberId": 0,
      "price": 0
    }
  ]
} */
  // const data = {
  //   id: tmpData.consumptionId,
  //   reqAmountList: [
  //     {
  //       memberId: tmpData.friendId,
  //       price: tmpData.price,
  //     },
  //   ],
  // };
  return axiosWithAuth
    .post('/api/dutchpay/create', data)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 더치페이 완료 (친구에게 요청보낸다.)
export async function consumptionDutchPayComplete(
  dutchPayId: number,
  friendId: number
): Promise<number> {
  return axiosWithAuth
    .put(`/api/dutchpay/complete/${dutchPayId}?memberId=${friendId}`)
    .then((res) => {
      return res.status;
    })
    .catch((e) => {
      throw e;
    });
}

// 더치페이 전체완료 id : 더치페이 아이디
export async function consumptionDutchPayAllComplete(
  id: number
): Promise<number> {
  return axiosWithAuth
    .post(`/api/dutchpay/complete/${id}`)
    .then((res) => {
      return res.status;
    })
    .catch((e) => {
      throw e;
    });
}
