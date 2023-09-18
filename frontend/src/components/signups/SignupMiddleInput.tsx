import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import SignupVerifyBtn from './children/SignupVerifyBtn';
import SignupCertificationBtn from './children/SignupCertificationBtn';

interface SignupMiddleInputProps {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setCheckPassword: (checkPassword: string) => void;
  setIsCertificated: (isCertificated: boolean) => void;
  email: string;
}

const SignupMiddleInput: React.FC<SignupMiddleInputProps> = (props) => {
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  // 발급받은 번호
  // 입력한 번호
  const [certificationNumber, setCertificationNumber] = useState("");

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          setMinutes(30);
          setSeconds(0);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval); // 여기에서 clearInterval을 호출합니다.
    }
  }, [isActive, minutes, seconds]);

  return (
    <KeyboardAvoidingView>
      <View style={[styles.input, styles.inputFirst]}>
        <TextInput
          placeholder="이메일"
          onChangeText={(text) => {
            props.setEmail(text);
          }}
        />
        <SignupCertificationBtn
          setSeconds={setSeconds}
          setIsActive={setIsActive}
          isActive={isActive}
          setMinutes={setMinutes}
          email={props.email}
        />
      </View>
      <View style={[styles.input, styles.inputSecond]}>
        <TextInput
          placeholder={isActive ? `인증번호 ${minutes}:${seconds}` : '인증번호'}
          onChangeText={(text) => {
            setCertificationNumber(text)
          }}
        />
        <SignupVerifyBtn
          setIsActive={setIsActive}
          setIsCertificated={props.setIsCertificated}
          certificationNumber={certificationNumber}
          email={props.email}
        />
      </View>

      <TextInput
        style={[styles.input, styles.inputThird]}
        placeholder="비밀번호"
        onChangeText={(text) => {
          props.setPassword(text);
        }}
      />
      <TextInput
        style={[styles.input, styles.inputFourth]}
        placeholder="비밀번호 재확인"
        onChangeText={(text) => {
          props.setCheckPassword(text);
        }}
      />
    </KeyboardAvoidingView>
  );
};
const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  input: {
    width: screenWidth * 0.9,
    height: 50,
    borderColor: '#808080',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputFirst: {
    borderTopWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
  },
  inputSecond: {
    borderTopWidth: 1,
  },
  inputThird: {
    borderTopWidth: 1,
  },
  inputFourth: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20,
  },
});
export default SignupMiddleInput;
