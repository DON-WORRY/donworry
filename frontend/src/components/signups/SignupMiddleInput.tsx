import React from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

interface SignupMiddleInputProps {
  setEmail: (email: string) => void;
  setCertificationNumber: (certification: string) => void;
  setPassword: (password: string) => void;
  setCheckPassword: (checkPassword: string) => void;
}

const SignupMiddleInput: React.FC<SignupMiddleInputProps> = (props) => {
  return (
    <KeyboardAvoidingView>
      <TextInput
        style={[styles.input, styles.inputFirst]}
        placeholder="이메일"
        onChangeText={(text) => {
          props.setEmail(text);
        }}
      />
      <TextInput
        style={[styles.input, styles.inputSecond]}
        placeholder="인증번호"
        onChangeText={(text) => {
          props.setCertificationNumber(text);
        }}
      />
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
    borderColor: 'gray',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingRight: 20,
    paddingLeft: 20,
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
