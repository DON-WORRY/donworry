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
  password: string;
  checkPassword: string;
  isCertificated: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const SignupMiddleInput: React.FC<SignupMiddleInputProps> = (props) => {
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  // 발급받은 번호
  // 입력한 번호
  const [certificationNumber, setCertificationNumber] = useState('');

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isCheckFocused, setIsCheckFocused] = useState(false);
  const [isCertifyFocused, setIsCertifyFocused] = useState(false);

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
      <View
        style={[
          styles.input,
          styles.inputFirst,
          isEmailFocused ? styles.isFocused : null,
        ]}
      >
        <TextInput
          style={[
            styles.innerText,
            isEmailFocused ? styles.innerFocusedText : null,
          ]}
          placeholder="이메일"
          onChangeText={(text) => {
            props.setEmail(text);
          }}
          value={props.email}
          inputMode="email"
          onFocus={() => {
            setIsEmailFocused(true);
          }}
          onBlur={() => {
            setIsEmailFocused(false);
          }}
          placeholderTextColor={
            isEmailFocused ? '#7777F3' : 'rgb(156, 156, 156)'
          }
          editable={!props.isCertificated}
        />
        <SignupCertificationBtn
          setSeconds={setSeconds}
          setIsActive={setIsActive}
          isActive={isActive}
          setMinutes={setMinutes}
          email={props.email}
          isCertificated={props.isCertificated}
          setIsLoading={props.setIsLoading}
        />
      </View>
      <View
        style={[
          styles.input,
          styles.inputSecond,
          isCertifyFocused ? styles.isFocused : null,
        ]}
      >
        <TextInput
          style={[
            styles.innerText,
            isCertifyFocused ? styles.innerFocusedText : null,
          ]}
          value={certificationNumber}
          placeholder={isActive ? `인증번호 ${minutes}:${seconds}` : '인증번호'}
          onChangeText={(text) => {
            setCertificationNumber(text);
          }}
          onFocus={() => {
            setIsCertifyFocused(true);
          }}
          onBlur={() => {
            setIsCertifyFocused(false);
          }}
          placeholderTextColor={
            isCertifyFocused ? '#7777F3' : 'rgb(156, 156, 156)'
          }
          editable={!props.isCertificated}
        />
        <SignupVerifyBtn
          setIsActive={setIsActive}
          setIsCertificated={props.setIsCertificated}
          certificationNumber={certificationNumber}
          email={props.email}
          isCertificated={props.isCertificated}
        />
      </View>

      <TextInput
        style={[
          styles.input,
          styles.inputThird,
          isPasswordFocused ? styles.isFocused : null,
        ]}
        placeholder="비밀번호"
        value={props.password}
        onChangeText={(text) => {
          props.setPassword(text);
        }}
        onFocus={() => {
          setIsPasswordFocused(true);
        }}
        onBlur={() => {
          setIsPasswordFocused(false);
        }}
        placeholderTextColor={
          isPasswordFocused ? '#7777F3' : 'rgb(156, 156, 156)'
        }
        secureTextEntry={true}
      />
      <TextInput
        style={[
          styles.input,
          styles.inputFourth,
          isCheckFocused ? styles.isFocused : null,
        ]}
        value={props.checkPassword}
        placeholder="비밀번호 재확인"
        onChangeText={(text) => {
          props.setCheckPassword(text);
        }}
        onFocus={() => {
          setIsCheckFocused(true);
        }}
        onBlur={() => {
          setIsCheckFocused(false);
        }}
        placeholderTextColor={isCheckFocused ? '#7777F3' : 'rgb(156, 156, 156)'}
        secureTextEntry={true}
      />
    </KeyboardAvoidingView>
  );
};
const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  input: {
    width: screenWidth - 40,
    height: 50,
    borderColor: '#808080',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18
  },
  inputFirst: {
    borderTopWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
    borderBottomWidth: 0.5,
  },
  inputSecond: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  inputThird: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  inputFourth: {
    borderTopWidth: 0.5,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 20,
  },
  innerText: {
    width: screenWidth * 0.57,
    fontSize: 18
  },
  isFocused: {
    borderColor: '#7777F3',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    fontWeight: 'bold',
  },
  innerFocusedText: {
    fontWeight: 'bold',
  },
});
export default SignupMiddleInput;
