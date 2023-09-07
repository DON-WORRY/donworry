import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface InputboxProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry: boolean;
}

interface ButtonProps {
  title: string;
  onPress: () => void;
}

interface ScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}
const Login: React.FC = () => {
  const [loginId, setloginId] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    // 로그인 시
    console.log(loginId);
    console.log(password);
  }

  return (
    <View>
      <Inputbox
        placeholder="이메일"
        value={loginId}
        onChangeText={(text) => setloginId(text)}
        secureTextEntry={false}
      />
      <Inputbox
        placeholder="비밀번호"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Botton title="로그인" onPress={handleLogin} />
      <GoToSignup />
    </View>
  );
};

const Inputbox: React.FC<InputboxProps> = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
    />
  );
};

const Botton: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.onPress}
      activeOpacity={0.9}
    >
      <Text style={styles.button_text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const GoToSignup: React.FC = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  function handleGoToSignup() {
    navigation.navigate('Test');
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      }}
    >
      <Text>아직 회원이 아니신가요?</Text>
      <TouchableOpacity onPress={handleGoToSignup} activeOpacity={0.8}>
        <Text style={styles.bottom_text}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: Dimensions.get('screen').width * 0.7,
    borderWidth: 1,
    borderColor: '#B0B9C2',
    borderRadius: 10,
    fontSize: 18,
    paddingLeft: 10,
    marginTop: 15,
  },
  button: {
    height: 45,
    width: Dimensions.get('screen').width * 0.7,
    backgroundColor: '#7777F3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button_text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  bottom_text: {
    marginLeft: 10,
    marginTop: 1,
    color: 'blue',
  },
});

export default Login;
