import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosWithAuth, axiosWithoutAuth } from '../axios/http';

/*
  {
  "memberName": "string",
  "memberEmail": "string",
  "memberPassword": "pL?5ONLg0L#",
  "memberGender": "MALE",
  "memberBirthDate": "2023-09-15"
  } 
  */
// 회원가입 data
type SignupData = {
  memberName: string;
  memberEmail: string;
  memberPassword: string;
  memberGender: string;
  memberBirthDate: string;
};

// 로그인 params
type LoginData = {
  memberEmail: string;
  memberPassword: string;
};

type EmailCheckData = {
  email: string;
  authCode: string;
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
export function userSignup(data: SignupData): Promise<void> {
  return axiosWithoutAuth.post('/api/members/join', data);
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

export function userLogin(data: LoginData): Promise<void> {
  return axiosWithoutAuth
    .post('/api/members/login', data)
    .then(async (response) => {
      console.log(response.data.data.memberBirthDate)
      const accessToken = await response.data.data.accessToken;
      const memberEmail = await response.data.data.memberEmail;
      const memberId = await response.data.data.memberId.toString();
      const memberName = await response.data.data.memberName;
      const memberRole = await response.data.data.memberRole;
      const refreshToken = await response.data.data.refreshToken;
      const memberBirthDate = await response.data.data.memberBirthDate;

      await storeData('accessToken', accessToken);
      await storeData('memberEmail', memberEmail);
      await storeData('memberId', memberId);
      await storeData('memberName', memberName);
      await storeData('memberRole', memberRole);
      await storeData('refreshToken', refreshToken);
      await storeData('memberBirthDate', memberBirthDate);
    })
    .catch((e) => {
      throw e.response.data; // 에러를 다시 던져서, 함수를 호출하는 측에서 catch 가능하도록 합니다.
    });
}

// 소셜 로그인
// 아직 잘 몰라서 보류
export function userSocialLogin(): Promise<void> {
  return axiosWithoutAuth
    .post('/api/user/?login')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 비밀번호 재발급
export function userFindPassword(): Promise<void> {
  return axiosWithAuth
    .get('/api/user/findpw')
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 로그아웃
export async function userLogout(): Promise<void> {
  return axiosWithAuth
    .get('/api/members/logout')
    .then((res) => {
      AsyncStorage.clear();
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

// Email Api
// 이메일 인증번호 발송
export function userEmailJoin(email: string): Promise<void> {
  return axiosWithoutAuth
    .post(`/api/emails/join?email=${email}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

// 이메일 인증번호 유효성 검증
export function userEmailCheck(data: EmailCheckData): Promise<void> {
  return axiosWithoutAuth
    .post('/api/emails/check', data)
    .then(() => {})
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
