import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SignupBtn: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => { /* 버튼 클릭 시 동작 */ }}>
        <FontAwesome name='angle-down' size={50} style={styles.icon} />
        <Text style={styles.buttonText}>가입하기</Text>
      </TouchableOpacity>
    </View>
  );
};
const screenWidth = Dimensions.get("screen").width
const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row', // 아이콘과 텍스트를 가로로 배열
    alignItems: 'center', // 아이콘과 텍스트를 세로 중앙에 정렬
    backgroundColor: '#2196F3', // 버튼 배경색
    padding: 10,
    borderRadius: 5,
    width: screenWidth * 0.9
  },
  buttonText: {
    color: 'white',
    marginRight: 5, // 텍스트와 아이콘 사이의 간격
  },
  icon: {
    color: 'black',
  },
});

export default SignupBtn;
