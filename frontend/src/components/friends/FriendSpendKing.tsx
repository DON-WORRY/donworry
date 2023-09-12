import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import FriendCubes from './children/FriendCubes';
import FriendSpendHeader from './children/FriendSpendHeader';

const dummyData = [
  {
    type: 'myData',
    eat: 370000,
    transport: 200000,
    entertainment: 50000,
    home: 300000,
    etc: 500000,
    health: 450000,
  },
  {
    type: 'spendKing',
    eat: 240000,
    transport: 100000,
    entertainment: 50000,
    home: 180000,
    etc: 500000,
    health: 30000,
  },
  {
    type: 'spendWorth',
    eat: 1000000,
    transport: 800000,
    entertainment: 3000000,
    home: 2000000,
    etc: 777777,
    health: 1400000,
  },
];
const friendsNumber = 5;
const rank = 3;

const FriendSpendKing: React.FC = () => {
  const [myName, setMyName] = useState('Lee');
  return (
    <View style={styles.container}>
      <FriendSpendHeader friendsNumber={friendsNumber} rank={rank} />
      <FriendCubes myName={myName} />
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
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
