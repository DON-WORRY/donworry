import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

type friendType = {
  friendId: number;
  friendName: string;
  friendEmail: string;
};

interface FriendListItemProps {
  friend: friendType;
}

const FriendListItem: React.FC<FriendListItemProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text]}>
        {props.friend.friendName}
      </Text>
      <Text style={[styles.text]}>
        {props.friend.friendEmail}
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

export default FriendListItem;
