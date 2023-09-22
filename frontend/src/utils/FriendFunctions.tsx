// import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';

// // 친구 목록 조회
export async function friendListInquiry(): Promise<any> {
  return axiosWithAuth
    .get('/api/friends/list')
    .then((res) => {
      return res.data
    })
    .catch((e) => {
      // console.error(e);
      throw e;
    });
}

// 친구 요청 리스트
export async function friendRequestList() {
  return axiosWithAuth
    .get('/api/friends/request/list')
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });
}

// 친구 요청
type FriendRequestData = {
  memberEmails: string[];
};
export async function friendRequest(data: FriendRequestData): Promise<void> {
  return axiosWithAuth
    .post('/api/friends/request', data)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 친구 수락 or 거절
type FriendCheckdata = {
  isAccept: boolean;
  friendRequestId: number;
  friendId: number;
};
export async function friendCheck(data: FriendCheckdata): Promise<void> {
  return axiosWithAuth
    .post('api/friends/check', data)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((e) => {
      // if e.data.message 만료된 토큰
      // axiosWithAuth => refresh
      throw e;
    });
}

type ReceivedRequest = {
  friendRequestId: 0;
  memberId: 0;
  memberEmail: string;
  memberName: string;
  createdTime: Date;
};

type SendRequest = {
  friendRequestId: number;
  memberId: number;
  memberEmail: string;
  memberName: string;
  createdTime: string;
};

type CheckResponseData = {
  receivedRequest: ReceivedRequest[];
  sendRequest: SendRequest[];
};

// // 친구 제거
// export async function friendDelete(data: DeleteData): Promise<void> {
//   return axiosWithAuth
//     .delete('/api/friend/delete', )
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((e) => {
//       console.error(e);
//       throw e;
//     });
// }
