import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { BarIndicator } from 'react-native-indicators';

const NewModal: React.FC = () => {
  return (
    <View style={styles.backGround}>
      <BarIndicator color="#7777F3" size={60} count={5} />
    </View>
  );
};
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: screenWidth,
    height: screenHeight
  },
});

export default NewModal;
