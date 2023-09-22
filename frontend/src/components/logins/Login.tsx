import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userLogin } from '../../utils/UserFunctions';
import { useDispatch } from 'react-redux';
import { setMypageModal } from '../../store/Modal';
interface InputboxProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry: boolean;
  keyboardType?: 'email-address';
}

interface ButtonProps {
  title: string;
  onPress: () => void;
  widthPercentage?: number;
  disabled?: boolean;
}

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    replace: (screen: string, params?: any) => void;
  };
}

const Login: React.FC = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  const [loginId, setloginId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  function handleLogin() {
    // 로그인 시
    const data = {
      memberEmail: loginId,
      memberPassword: password,
    };
    userLogin(data)
      .then(() => {
        dispatch(setMypageModal(true));
        navigation.replace('TabNavigation', { screen: 'Home' });
      })
      .catch((e) => {
        return Alert.alert('로그인 실패', `${e.message}`);
      });
  }

  return (
    <View>
      <Inputbox
        placeholder="이메일"
        value={loginId}
        onChangeText={(text) => setloginId(text)}
        secureTextEntry={false}
        keyboardType="email-address"
      />
      <Inputbox
        placeholder="비밀번호"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Button title="로그인" onPress={handleLogin} />
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
      keyboardType={props.keyboardType}
    />
  );
};

const Button: React.FC<ButtonProps> = (props) => {
  const { title, onPress, widthPercentage = 0.7, disabled } = props;
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: Dimensions.get('screen').width * widthPercentage,
          backgroundColor: disabled ? 'gray' : '#7777F3',
        },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const GoToSignup: React.FC = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  function handleGoToSignup() {
    navigation.navigate('SignUp');
  }
  return (
    <View style={styles.bottomView}>
      <Text>아직 회원이 아니신가요?</Text>
      <TouchableOpacity onPress={handleGoToSignup} activeOpacity={0.8}>
        <Text style={styles.bottomText}>회원가입</Text>
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
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  bottomText: {
    marginLeft: 10,
    marginTop: 1,
    color: 'blue',
  },
});

export default Login;
export { Button };
