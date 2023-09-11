import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import FriendCubes from './children/FriendCubes';

const FriendSpendKing: React.FC = () => {
  return (
    <View style={styles.container}>
      <FriendCubes />
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 470,
    padding: 20,
    width: screenWidth - 40,
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  goldCube: {
    color: '#FFD700',
  },
  myCube: {
    color: '#7777F3',
  },
});

export default FriendSpendKing;
