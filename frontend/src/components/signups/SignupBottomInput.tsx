import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

import SignupGenderBtn from './children/SignupGenderBtn';

interface SignupBottomInputProps {
  setUserName: (userName: string) => void;
  setUserGender: (userGender: string) => void;
  setUserBirth: (userBirth: string) => void;
}

const SignupBottomInput: React.FC<SignupBottomInputProps> = (props) => {
  const [selectedGender, setSelectedGender] = useState('성별');

  useEffect(() => {
    props.setUserGender(selectedGender);
  }, [selectedGender]);
  return (
    <KeyboardAvoidingView>
      <TextInput
        style={[styles.input, styles.inputFirst]}
        placeholder="이름"
        onChangeText={(text) => {
          props.setUserName(text);
        }}
      />

      <View style={[styles.input, styles.inputSecond]}>
        <TextInput editable={false} placeholder={selectedGender} />
        <SignupGenderBtn setSelectedGender={setSelectedGender} />
      </View>

      <TextInput
        keyboardType="numeric" // 숫자 키보드 설정
        style={[styles.input, styles.inputThird]}
        placeholder="생년월일 8자리"
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
    borderColor: '#808080',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
