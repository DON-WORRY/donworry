import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { userEmailCheck } from '../../../utils/UserFunctions';

interface SignupVerifyBtnProps {
  setIsActive: (isActive: boolean) => void;
  setIsCertificated: (isCertificated: boolean) => void;
  certificationNumber: string;
  email: string;
}

const SignupVerifyBtn: React.FC<SignupVerifyBtnProps> = (props) => {
  function handleVerify() {
    props.setIsActive(false);
    console.log(props.email)
    console.log(props.certificationNumber)
    const emailCheckData = {
      email: props.email,
      authCode: props.certificationNumber,
    }
    userEmailCheck(emailCheckData).then((res) => {
      console.log("ok")
      // 유효하기 때문에 이메일 인증 버튼 비활성화
    }).catch((e) => {
      console.log("error")
      // 유효하지 않기 때문에 확인을 요구하는 모달이나 alert실행
    })
    props.setIsCertificated(true);
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleVerify}>
      <Text>확인</Text>
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
});

export default SignupVerifyBtn;
