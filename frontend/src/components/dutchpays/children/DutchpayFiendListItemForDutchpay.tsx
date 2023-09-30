import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface FriendProps {
  friendId: number;
  friendName: string;
  friendEmail: string;
  price?: string;
}

interface FiendListItemForDutchpayProps {
  friend: FriendProps;
  state: string;
}

const FiendListItemForDutchpay: React.FC<FiendListItemForDutchpayProps> = (
  props
) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: props.state }]}>
        {props.friend.friendName}
      </Text>
      <Text style={[styles.text, { color: props.state }]}>
        {props.friend.friendEmail}
      </Text>
    </View>
  );
};

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    flexDirection: 'row',
    // paddingRight: 10,
    // paddingLeft: 10,
    justifyContent: 'space-between',
    marginTop: 15,
  },
  text: {
    fontWeight: '600',
    fontSize: 22,
  },
});

export default FiendListItemForDutchpay;
