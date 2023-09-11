import React from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native';
const SignupMiddleInput: React.FC = () => {
  return <View>
    <View>

    </View>
    <TextInput style={[styles.input, styles.inputFirst]} placeholder="    이메일"/>
    <TextInput style={[styles.input, styles.inputSecond]} placeholder="    인증번호"/>
    <TextInput style={[styles.input, styles.inputThird]} placeholder="    비밀번호"/>
    <TextInput style={[styles.input, styles.inputFourth]} placeholder="    비밀번호 재확인"/>
  </View>;
};
const screenWidth = Dimensions.get("screen").width
const styles = StyleSheet.create({
  input: {
    width: screenWidth * 0.9,
    height: 50,
    borderColor: "gray",
    borderLeftWidth: 1,
    borderRightWidth: 1,
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
  },
  inputFourth: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
})
export default SignupMiddleInput;
