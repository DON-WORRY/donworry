import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { Button } from '../logins/Login';
import { FontAwesome5 } from '@expo/vector-icons';
import { MemberProps } from '../../screens/consumptions/DutchpayRequestScreen';

type KeyboardProps = {
  onButtonClick: (value: number) => void;
  onBackButtonClick: () => void;
};

interface NumberKeyBoardProps {
  onInputChange: (newValue: string) => void;
  selectedMember?: MemberProps;
}

const NumberKeyBoard: React.FC<NumberKeyBoardProps> = ({
  onInputChange,
  selectedMember,
}) => {
  const [inputValue, setInputValue] = useState('');

  function handleButtonClick(value: number) {
    if (value == 0 && inputValue === '') {
      return;
    }
    setInputValue((prevValue) => prevValue + value);
    onInputChange(inputValue + value);
  }

  function handleBackspace() {
    setInputValue((prevValue) => prevValue.slice(0, -1));
    onInputChange(inputValue.slice(0, -1));
  }

  return (
    <>
      <View style={styles.nameView}>
        <Text style={styles.nameText}>
          {selectedMember ? selectedMember.memberName : '나'}
        </Text>
      </View>
      <View style={styles.accountView}>
        <Text style={styles.accountText}>
          {inputValue === '' ? 0 : inputValue}원
        </Text>
      </View>
      <KeyBoard
        onButtonClick={(value) => handleButtonClick(value)}
        onBackButtonClick={() => handleBackspace()}
      />
    </>
  );
};

const KeyBoard: React.FC<KeyboardProps> = (props) => {
  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.keyboardView}>
        <TouchableOpacity
          style={styles.keyboardTouch}
          onPress={() => props.onButtonClick(1)}
        >
          <Text style={styles.keyboardText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.keyboardTouch}
          onPress={() => props.onButtonClick(2)}
        >
          <Text style={styles.keyboardText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.keyboardTouch}
          onPress={() => props.onButtonClick(3)}
        >
          <Text style={styles.keyboardText}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.keyboardView}>
        <TouchableOpacity
          style={styles.keyboardTouch}
          onPress={() => props.onButtonClick(4)}
        >
          <Text style={styles.keyboardText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.keyboardTouch}
          onPress={() => props.onButtonClick(5)}
        >
          <Text style={styles.keyboardText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.keyboardTouch}
          onPress={() => props.onButtonClick(6)}
        >
          <Text style={styles.keyboardText}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.keyboardView}>
        <TouchableOpacity
          style={styles.keyboardTouch}
          onPress={() => props.onButtonClick(7)}
        >
          <Text style={styles.keyboardText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.keyboardTouch}
          onPress={() => props.onButtonClick(8)}
        >
          <Text style={styles.keyboardText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.keyboardTouch}
          onPress={() => props.onButtonClick(9)}
        >
          <Text style={styles.keyboardText}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.keyboardView}>
        <TouchableOpacity style={styles.keyboardTouch}>
          <Text style={styles.keyboardText}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.keyboardTouch}
          onPress={() => props.onButtonClick(0)}
        >
          <Text style={styles.keyboardText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.keyboardTouch}
          onPress={() => props.onBackButtonClick()}
        >
          <FontAwesome5 name="backspace" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const Nq1Button: React.FC<Nq1ButtonProps> = (props) => {
//   return (
//     <TouchableOpacity
//       style={styles.n1button}
//       onPress={props.onPress}
//       activeOpacity={0.9}
//     >
//       <Text style={styles.n1buttonText}>{props.title}</Text>
//     </TouchableOpacity>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  nameView: {
    width: Dimensions.get('screen').width * 0.9,
    padding: 10,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
  },
  accountView: {
    padding: 5,
  },
  accountText: {
    fontSize: 25,
    fontWeight: '700',
  },
  keyboardContainer: {
    marginTop: 15,
  },
  keyboardView: {
    width: Dimensions.get('screen').width * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  keyboardTouch: {
    padding: 12,
  },
  keyboardText: {
    fontSize: 25,
    fontWeight: '700',
  },
});
export default NumberKeyBoard;
