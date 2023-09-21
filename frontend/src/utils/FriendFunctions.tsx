import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';

type AcceptData = {
  receiverId: number;
};
type RejectData = {
  requestId: number;
};
type DeleteData = {
  friendId: number;
};

// 친구 목록 조회
export async function friendListInquiry(): Promise<void> {
  return axiosWithAuth
    .get('/api/friend/list')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 친구 요청
export async function friendRequest(): Promise<void> {
  return axiosWithAuth
    .post('/api/friend/request')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 친구 요청 수락
export async function friendAccept(data: AcceptData): Promise<void> {
  return axiosWithAuth
    .put('/api/friend/accept', )
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 친구 요청 거절
export async function friendReject(data: RejectData): Promise<void> {
  return axiosWithAuth
    .delete('/api/friend/reject', )
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 친구 제거
export async function friendDelete(data: DeleteData): Promise<void> {
  return axiosWithAuth
    .delete('/api/friend/delete', )
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
