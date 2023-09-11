import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface SignupBtnProps {
  signupOper: () => void,
}

const SignupBtn: React.FC<SignupBtnProps> = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => { props.signupOper() }}>
        <FontAwesome name='angle-down' size={40} style={styles.icon} />
        <Text style={styles.buttonText}>가입하기</Text>
      </TouchableOpacity>
    </View>
  );
};
const screenWidth = Dimensions.get("screen").width
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row', // 아이콘과 텍스트를 가로로 배열
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    backgroundColor: '#7777F3', // 버튼 배경색
    borderRadius: 5,
    width: screenWidth * 0.9,
    height: 50
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  icon: {
    color: 'white',
  },
});

export default SignupBtn;
