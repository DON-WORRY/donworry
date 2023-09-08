import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

interface SignupBottomInputProps {
  setUserName: (userName: string) => void;
  setUserGender: (userGender: string) => void;
  setUserBirth: (userBirth: string) => void;
}

const SignupBottomInput: React.FC<SignupBottomInputProps> = (props) => {
  return (
    <KeyboardAvoidingView>
      <TextInput
        style={[styles.input, styles.inputFirst]}
        placeholder="이름"
        onChangeText={(text) => {
          props.setUserName(text);
        }}
      />
      <TextInput
        style={[styles.input, styles.inputSecond]}
        placeholder="성별"
        onChangeText={(text) => {
          props.setUserGender(text);
        }}
      />
      <TextInput
        style={[styles.input, styles.inputThird]}
        placeholder="생년월일"
        onChangeText={(text) => {
          props.setUserBirth(text);
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
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputFirst: {
    borderTopWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  inputSecond: {
    borderTopWidth: 1,
  },
  inputThird: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
  },
});
export default SignupBottomInput;
