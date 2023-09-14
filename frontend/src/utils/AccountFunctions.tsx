import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';
// 계좌별 거래 합계
export function accountTradeTotal() {
    axiosWithAuth.get("/api/account/account")
}
// 계좌별 거래 내역
export function accountTradeHistory() {
    axiosWithAuth.get("/api/account/account/trade")
}
// 카드별 소비합계
export function accountCardTotal() {
    axiosWithAuth.get("/api/account/card/total")
}
// 카드별 소비 내역
export function accountCardHistory() {
    axiosWithAuth.get("/api/account/card/history")
}
// 보유 카드 목록 조회
export function accountCardListInquiry() {
    axiosWithAuth.get("/api/account/card/cardlist")
}
// 월별 순 자산
export function accountPerMonthAsset () {
    axiosWithAuth.get("/api/account/statistics")
}
// 목표 설정
export function accountSetGoal() {
    axiosWithAuth.post("/api/account/goal")
}
// 목표 조회
export function accountGoalInquiry() {
    axiosWithAuth.get("/api/account/goal")
}
// 내 자산 순위 조회
export function accountAssetRankInquiry() {
    axiosWithAuth.get("/api/account/rank")
}