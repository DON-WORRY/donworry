import React from 'react';
import { TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const MyButton = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => alert('Click!!!')}>
      <Text style={styles.text}>내역</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    borderRadius: 15,
    width: width * 0.17,
    height: width * 0.115,
    justifyContent: 'center',
    marginTop: -width * 0.035,
  },
  text: {
    color: 'white',
    fontSize: width * 0.045,
    textAlign: 'center',
  },
});

export default MyButton;
