import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

type Page = {
  a: boolean;
  b: boolean;
  c: boolean;
};

interface SignupEasyButtonProps {
  setPageData: (data: Page) => void;
}

const SignupEasyButton: React.FC<SignupEasyButtonProps> = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.setPageData({
            a: false,
            b: true,
            c: false,
          });
        }}
      >
        <Text style={styles.buttonText}>간편인증 등록하기</Text>
      </TouchableOpacity>
    </View>
  );
};
const screenWidth = Dimensions.get('screen').width;
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
    height: 50,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
  icon: {
    color: 'white',
  },
});

export default SignupEasyButton;
