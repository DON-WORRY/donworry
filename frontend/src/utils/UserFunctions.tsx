import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';

// 회원가입 params
type SignupParams = {
  email: string;
  name: string;
  password: string;
  gender: string;
  birthday: string;
};

// 로그인 params
type LoginParams = {
  email: string;
  password: string;
};

// 토큰 저장하기
const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

// 회원가입
export function userSignup(data: SignupParams) {
  axiosWithoutAuth
    .post('/api/user/signup', data)
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {
      console.error(e);
    });
}

// 로그인 (비동기 반환 x)
// export function userLogin(data: LoginParams) {
//   // 토큰 저장
//   axiosWithAuth
//     .post('/api/user/login', data)
//     .then((r) => {
//       console.log(r);
//     // 여기서 나온 데이터가 토큰이랑 id값 등
//     // 스토리지에 저장
//     })
//     .catch((e) => {
//       console.error(e);
//     });

//   const key = 'myToken';
//   const myToken = '';
//   storeData(key, myToken);
// }

export function userLogin(data: LoginParams): Promise<void> {
  return axiosWithAuth
    .post('/api/user/login', data)
    .then((response) => {
      console.log(response);

      const refreshToken = response.data.refreshToken;
      const memberId = response.data.memberId;

      storeData('refreshToken', refreshToken);
      storeData('memberId', memberId);
    })
    .catch((e) => {
      console.error(e);
      throw e; // 에러를 다시 던져서, 함수를 호출하는 측에서 catch 가능하도록 합니다.
    });
}

// 소셜 로그인
// 아직 잘 몰라서 보류
export function userSocialLogin() {
  axiosWithoutAuth.post('/api/user/?login');
}

// 비밀번호 재발급
export function userFindPassword() {
  axiosWithAuth.get('/api/user/findpw');
}

// 로그아웃
export function userLogout() {
  axiosWithAuth.get('/api/user/logout');
}
