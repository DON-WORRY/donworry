import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';
// 회원정보 조회
export function mypageMemberInquiry() {
    const id = 1
    axiosWithAuth.get(`/api/mypage/${id}`)
}
// 회원정보 수정
export function mypageMemberModify() {
    axiosWithAuth.put('/api/mypage/modify')
}
// 비밀번호 재설정
export function mypagePasswordReset() {
    axiosWithAuth.put('/api/mypage/reset')
}
// 회원탈퇴
export function mypageWithdrawal() {
    axiosWithAuth.delete('/api/mypage/leave')
}