import React from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';

interface FriendSpendHeader {
  friendsNumber: number;
  rank: number;
}

const FriendSpendHeader: React.FC<FriendSpendHeader> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.friendsNumberText}>
        친구 {props.friendsNumber}명 중
      </Text>
      <View style={styles.smallBox}>
        <Text style={styles.spendText}>총 소비 </Text>
        <Text style={styles.rankText}>{props.rank}등</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  smallBox: {
    flexDirection: "row"
  },
  friendsNumberText: {
    fontSize: 24,
    fontWeight: "500"
  },
  spendText: {
    fontSize: 32,
    fontWeight: "bold"
  },
  rankText: {
    fontSize: 32,
    color: '#F69496',
    fontWeight: "bold"
  },
});

export default FriendSpendHeader;
