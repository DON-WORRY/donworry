import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SignupVerifyBtnProps {
  setIsActive: (isActive: boolean) => void;
  setIsCertificated: (isCertificated: boolean) => void;
  issuedNumber: number;
  certificationNumber: number;
}

const SignupVerifyBtn: React.FC<SignupVerifyBtnProps> = (props) => {
  function handleVerify() {
    props.setIsActive(false);
    // 발급받은 숫자랑 현재 숫자가 같으면
    if (props.issuedNumber === props.certificationNumber) {
      // 버튼도 둘 다 비활성화 되어야 함
    }
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
