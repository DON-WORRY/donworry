import React from 'react';
import { View, Dimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('screen');

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = (props) => {
  const { title, onPress, disabled } = props;
  return (
    <TouchableOpacity
      style={[
        styles.button,
      ]}
      onPress={onPress}
      activeOpacity={0.5}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EFF2FB',
    borderRadius: 10,
    width: width * 0.13,
    height: width * 0.09,
    justifyContent: 'center',
    marginTop: width * 0.05,
    zIndex: 2,
  },
  text: {
    fontSize: width * 0.036,
    textAlign: 'center',
  },
});

export { Button };
