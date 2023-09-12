import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import ComponentsHeader from '../../components/ComponentsHeader';
import FriendMessage from '../../components/friends/FriendMessage';
import FriendSpendKing from '../../components/friends/FriendSpendKing';
import FriendList from '../../components/friends/FriendList';

const FriendScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ComponentsHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceHorizontal={true}
      >
        <FriendMessage />
        <FriendSpendKing />
        <FriendList />
      </ScrollView>
    </View>
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
