import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SignupGenderBtnProps {
  setSelectedGender: (selectedGender: string) => void;
}

const SignupGenderBtn: React.FC<SignupGenderBtnProps> = (props) => {
  const [toggle, setToggle] = useState(0);

  function handleSelectGender(genderNumber: number) {
    if (toggle == genderNumber) {
      setToggle(0);
      props.setSelectedGender('성별');
    } else {
      setToggle(genderNumber);
      if (genderNumber == 1) {
        props.setSelectedGender('남자');
      } else if (genderNumber == 2) {
        props.setSelectedGender('여자');
      }
    }
  }

  return (
    <View style={styles.button}>
      <TouchableOpacity
        style={[styles.maleButton, toggle === 1 ? styles.selectedButton : null]}
        onPress={() => {
          handleSelectGender(1);
        }}
      >
        <Text style={toggle === 1 ? styles.selectedText : null}>남자</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.femaleButton,
          toggle === 2 ? styles.selectedButton : null,
        ]}
        onPress={() => {
          handleSelectGender(2);
        }}
      >
        <Text style={toggle === 2 ? styles.selectedText : null}>여자</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: '46%',
    height: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  maleButton: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 0.5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#808080',
  },
  femaleButton: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 0.5,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#808080',
  },
  selectedButton: {
    borderColor: '#7777F3',
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  selectedText: {
    color: '#7777F3',
    fontWeight: '900',
  },
});
export default SignupGenderBtn;
