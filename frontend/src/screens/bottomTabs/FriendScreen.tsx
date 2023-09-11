import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import FriendHeader from '../../components/friends/FriendHeader';
import FriendMessage from '../../components/friends/FriendMessage';
import FriendSpendKing from '../../components/friends/FriendSpendKing';
import FriendList from '../../components/friends/FriendList';

const FriendScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      alwaysBounceHorizontal={true}
    >
      <FriendHeader />
      <FriendMessage />
      <FriendSpendKing />
      <FriendList />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRignt: 20,
    backgroundColor: 'light-gray',
  },
});

export default FriendScreen;
