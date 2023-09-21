import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { userEmailCheck } from '../../../utils/UserFunctions';

interface SignupVerifyBtnProps {
  setIsActive: (isActive: boolean) => void;
  setIsCertificated: (isCertificated: boolean) => void;
  certificationNumber: string;
  email: string;
  isCertificated: boolean;
}

const SignupVerifyBtn: React.FC<SignupVerifyBtnProps> = (props) => {
  function handleVerify() {
    const emailCheckData = {
      email: props.email,
      authCode: props.certificationNumber,
    };
    userEmailCheck(emailCheckData)
      .then(() => {
        console.log('ok');
        // 유효하기 때문에 이메일 인증 버튼 비활성화
        props.setIsActive(false);
        props.setIsCertificated(true);
      })
      .catch(() => {
        console.log('error');
        // 유효하지 않기 때문에 확인을 요구하는 모달이나 alert실행
        console.log(props.email.length);
        console.log(props.certificationNumber);
        if (props.email) {
          console.log(1);
          if (props.certificationNumber != '') {
            return alert('인증번호가 유효하지 않습니다.');
          } else {
            return alert('인증번호를 입력해주세요.');
          }
        }
      });
  }

  return (
    <TouchableOpacity style={[styles.button, props.isCertificated ? styles.disabledBtn : null]} onPress={handleVerify} disabled={props.isCertificated}>
      <Text style={props.isCertificated ? styles.disabledText : null}>확인</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '23%',
    height: '60%',
    borderRadius: 5,
    borderColor: '#808080',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledBtn: {
    width: '23%',
    height: '60%',
    borderRadius: 5,
    borderColor: '#808080',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(156,156,156)',
  },
  disabledText: {
    color: "white"
  }
});

export default SignupVerifyBtn;
