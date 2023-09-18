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

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isGenderFocused, setIsGenderFocused] = useState(false);
  const [isBirthFocused, setIsBirthFocused] = useState(false);

  useEffect(() => {
    props.setUserGender(selectedGender);
  }, [selectedGender]);
  return (
    <KeyboardAvoidingView>
      <TextInput
        style={[
          styles.input,
          styles.inputFirst,
          isNameFocused ? styles.isFocused : null,
        ]}
        placeholder="이름"
        placeholderTextColor={isNameFocused ? '#7777F3' : 'rgb(156, 156, 156)'}
        onChangeText={(text) => {
          props.setUserName(text);
        }}
        onFocus={() => {
          setIsNameFocused(true);
          setIsGenderFocused(false);
        }}
        onBlur={() => {
          setIsNameFocused(false);
        }}
      />

      <View
        style={[
          styles.input,
          styles.inputSecond,
          isGenderFocused ? styles.isFocused : null,
        ]}
        onTouchStart={() => {
          setIsGenderFocused(true);
        }}
      >
        <TextInput
          style={isGenderFocused ? styles.innerFocusedText : null}
          editable={false}
          placeholder={selectedGender}
          placeholderTextColor={
            isGenderFocused ? '#7777F3' : 'rgb(156, 156, 156)'
          }
        />
        <SignupGenderBtn
          setIsGenderFocused={setIsGenderFocused}
          setSelectedGender={setSelectedGender}
        />
      </View>

      <TextInput
        keyboardType="numeric" // 숫자 키보드 설정
        style={[
          styles.input,
          styles.inputThird,
          isBirthFocused ? styles.isFocused : null,
        ]}
        placeholder="생년월일 8자리"
        placeholderTextColor={isBirthFocused ? '#7777F3' : 'rgb(156, 156, 156)'}
        onChangeText={(text) => {
          props.setUserBirth(text);
        }}
        onFocus={() => {
          setIsBirthFocused(true);
          setIsGenderFocused(false);
        }}
        onBlur={() => {
          setIsBirthFocused(false);
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
    borderBottomWidth: 0.5,
  },
  inputSecond: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  inputThird: {
    borderTopWidth: 0.5,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
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
export default SignupBottomInput;
