import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { consumptionFriendRank } from '../../../utils/ConsumptionFunctions';
import { FontAwesome } from '@expo/vector-icons';
interface FriendSpendHeader {
  friendsNumber: number;
  rank: number
}

const FriendSpendHeader: React.FC<FriendSpendHeader> = (props) => {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.friendsNumberText}>
        친구 {props.friendsNumber}명 중 총 소비는
      </Text>
        <Text style={styles.rankText}>{props.rank}등</Text>
        <Text style={styles.friendsNumberText}>
        입니다.
      </Text>
    </View>
    <View style={styles.bottomContainer}>
      <View style={styles.iconStyle}>
      <FontAwesome name="bookmark" size={20} color={"#7777F3"}/>
      </View>
      <Text style={styles.friendsNumberText}>
        각 카테고리 별 친구들의 소비 중에서 가장 적게 소비한 금액을 가져왔습니다.
      </Text>
    </View>
    </>
  );
};

const screenWidth = Dimensions.get("screen").width
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom : 10
  },
  smallBox: {
    flexDirection: 'row',
  },
  friendsNumberText: {
    fontSize: 24,
    fontWeight: '500',
  },
  spendText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  rankText: {
    fontSize: 32,
    color: '#F69496',
    fontWeight: 'bold',
  },
  bottomContainer : {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    marginBottom: 20,
    width: screenWidth - 120
  },
  iconStyle : {
    flexDirection: "column",
    marginRight: 10,
    marginTop: 10,
  }
});

export default FriendSpendHeader;
