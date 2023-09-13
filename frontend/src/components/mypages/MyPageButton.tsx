import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
interface ButtonProps {
  title: string;
  onPress: () => void;
  color: string;
}

const MypageButton: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: props.color }]}
      onPress={props.onPress}
      activeOpacity={0.9}
    >
      <Text style={styles.button_text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button_text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
  },
});

export default MypageButton;
