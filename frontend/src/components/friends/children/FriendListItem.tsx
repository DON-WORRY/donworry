import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

type friendType = {
  name: string;
  email: string;
};

interface FriendListItemProps {
  friend: friendType;
  state: string;
}

const FriendListItem: React.FC<FriendListItemProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: props.state }]}>
        {props.friend.name}
      </Text>
      <Text style={[styles.text, { color: props.state }]}>
        {props.friend.email}
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
