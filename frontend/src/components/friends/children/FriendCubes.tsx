import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const FriendCubes: React.FC = () => {
  return (
    <View style={styles.container}>
      <FontAwesome name="cube" size={80} style={styles.myCube} />
      <FontAwesome name="cube" size={80} style={styles.goldCube} />
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  goldCube: {
    color: '#FFD700',
  },
  myCube: {
    color: '#7777F3',
  },
});

export default FriendCubes;
