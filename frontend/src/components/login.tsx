import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Touchable,
  TouchableOpacity,
  Text,
} from 'react-native';

interface InputboxProps {
  placeholder: string;
}

interface ButtonProps {
  title: string;
}

const Login = () => {
  return (
    <View>
      <Inputbox placeholder="이메일" />
      <Inputbox placeholder="비밀번호" />
      <Botton title="로그인" />
      <GoToSignup />
    </View>
  );
};

const Inputbox: React.FC<InputboxProps> = (props) => {
  return <TextInput style={styles.input} placeholder={props.placeholder} />;
};

const Botton: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const GoToSignup: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Text>아직 회원이 아니신가요?</Text>
      <TouchableOpacity>
        <Text>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: Dimensions.get('screen').width * 0.7,
    borderWidth: 1,
    borderColor: '#B0B9C2',
    borderRadius: 10,
    fontSize: 20,
    paddingLeft: 10,
  },
  button: {
    height: 45,
    width: Dimensions.get('screen').width * 0.7,
    backgroundColor: '#7777F3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
