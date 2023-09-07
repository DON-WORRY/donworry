import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
const SignupBottomInput: React.FC = () => {
  
  return <View>
    <TextInput style={[styles.input, styles.inputFirst]} placeholder='    이름'/>
    <TextInput style={[styles.input, styles.inputSecond]} placeholder='    성별'/>
    <TextInput style={[styles.input, styles.inputThird]} placeholder='    생년월일'/>
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
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
})
export default SignupBottomInput;
