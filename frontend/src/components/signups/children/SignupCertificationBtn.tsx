import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { userEmailJoin} from '../../../utils/UserFunctions';

interface SignupCertificationBtnProps {
  setIsActive: (isActive: boolean) => void;
  isActive: boolean;
  setMinutes: (minutes: number) => void;
  setSeconds: (seconds: number) => void;
  email: string;
}

const SignupCertificationBtn: React.FC<SignupCertificationBtnProps> = (
  props
) => {
  const [buttonText, setButtonText] = useState('인증');
  function handleCertification() {
    props.setIsActive(true);
    setButtonText('재발급');
    userEmailJoin(props.email)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });

    // 발급 실행
    // props.setIssuedNumber(1010);

    if (props.isActive) {
      props.setMinutes(30);
      props.setSeconds(0);
    }
  }
  return (
    <TouchableOpacity style={styles.button} onPress={handleCertification}>
      <Text>{buttonText}</Text>
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
export default SignupCertificationBtn;
