import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';
// 친구 목록 조회
export function friendListInquiry() {
  axiosWithAuth.get("/api/friend/list");
}

// 친구 요청
export function friendRequest() {
    axiosWithAuth.post("/api/friend/request")
}

// 친구 요청 수락
export function friendAccept() {
    axiosWithAuth.put("/api/friend/accept")
}

// 친구 요청 거절
export function friendReject() {
    axiosWithAuth.delete("/api/friend/reject")
}

// 친구 제거
export function friendDelete() {
    axiosWithAuth.delete("/api/friend/delete")
}
