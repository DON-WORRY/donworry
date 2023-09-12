import React from 'react';
import { TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

const MyButton = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => alert('Click!!!')}>
      <Text style={styles.text}>내역</Text>
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
  },
  text: {
    fontSize: width * 0.036,
    textAlign: 'center',
  },
});

export default MyButton;
