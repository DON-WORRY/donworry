import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth } from '../axios/http';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// 목표를 설정하면 올해까지만 해당되게 하려고 생각했었음.
type Goal = {
  goalAmount: number;
};
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // 읽기 에러
    throw e;
  }
};
// 사용자 계좌 불러오기
export async function accountSearchAccountList(): Promise<void> {
  const memberId = await getData('memberId');
  return axiosWithAuth
    .get(`/api/account/list/${memberId}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
}
// 계좌별 거래 내역
export async function accountTradeHistory(account_id: number): Promise<void> {
  return axiosWithAuth
    .get(`/api/account/${account_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 월별 순 자산
export async function accountPerMonthAsset(): Promise<void> {
  const memberId = await getData('memberId');
  return axiosWithAuth
    .get(`/api/account/statistics${memberId}`)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      throw e;
    });
}

// // 계좌별 거래 합계
// export async function accountTradeTotal(): Promise<void> {
//   return axiosWithAuth
//     .get('/api/account/account')
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((e) => {
//       throw e;
//     });
// }

// // 카드별 소비합계
// export async function accountCardTotal(): Promise<void> {
//   return axiosWithAuth
//     .get('/api/account/card/total')
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((e) => {
//       throw e;
//     });
// }
// 카드별 소비 내역
export async function accountCardHistory(): Promise<void> {
  const memberId = await getData('memberId');
  return axiosWithAuth
    .get(`/api/card/${memberId}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e)
      throw e;
    });
}
// 상세카드 소비내역
export async function accountCardDetail(cardId: number): Promise<void> {
  return axiosWithAuth
    .get(`/api/card/detail/${cardId}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 사용자 카드 불러오기
export async function accountCardList(): Promise<void> {
  const memberId = await getData('memberId');
  return axiosWithAuth
    .get(`/api/card/list/${memberId}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

// // 목표 설정
// export async function accountSetGoal(data: Goal): Promise<void> {
//   return axiosWithAuth
//     .post('/api/account/goal', data)
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((e) => {
//       throw e;
//     });
// }
// // 목표 조회
// export async function accountGoalInquiry(): Promise<void> {
//   return axiosWithAuth
//     .get('/api/account/goal')
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((e) => {
//       throw e;
//     });
// }
// // 내 자산 순위 조회
// export async function accountAssetRankInquiry(): Promise<void> {
//   return axiosWithAuth
//     .get('/api/account/rank')
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((e) => {
//       throw e;
//     });
// }
