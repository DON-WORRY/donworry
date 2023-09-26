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
        {props.friend.friendEmail.slice(0, 8) + '...'}
      </Text>
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    width: screenWidth - 80,
    height: 60,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default FiendListItemForDutchpay;
