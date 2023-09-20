import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import ComponentsHeader from '../../components/ComponentsHeader';
import FriendMessageComponent from '../../components/friends/FriendMessageComponent';
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
        <FriendMessageComponent />
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
  },
});

export default FriendScreen;
