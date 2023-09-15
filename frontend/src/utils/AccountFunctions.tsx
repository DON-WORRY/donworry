import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';

// 목표를 설정하면 올해까지만 해당되게 하려고 생각했었음.
type Goal = {
  goalAmount: number;
};

// 계좌별 거래 합계
export function accountTradeTotal(): Promise<void> {
  return axiosWithAuth
    .get('/api/account/account')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 계좌별 거래 내역
export function accountTradeHistory(): Promise<void> {
  return axiosWithAuth
    .get('/api/account/account/trade')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 카드별 소비합계
export function accountCardTotal(): Promise<void> {
  return axiosWithAuth
    .get('/api/account/card/total')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 카드별 소비 내역
export function accountCardHistory(): Promise<void> {
  return axiosWithAuth
    .get('/api/account/card/history')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 보유 카드 목록 조회
export function accountCardListInquiry(): Promise<void> {
  return axiosWithAuth
    .get('/api/account/card/cardlist')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 월별 순 자산
export function accountPerMonthAsset(): Promise<void> {
  return axiosWithAuth
    .get('/api/account/statistics')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 목표 설정
export function accountSetGoal(data: Goal): Promise<void> {
  return axiosWithAuth
    .post('/api/account/goal', data)
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 목표 조회
export function accountGoalInquiry(): Promise<void> {
  return axiosWithAuth
    .get('/api/account/goal')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
// 내 자산 순위 조회
export function accountAssetRankInquiry(): Promise<void> {
  return axiosWithAuth
    .get('/api/account/rank')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
