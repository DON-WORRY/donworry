import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const FriendMessageScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
      <Text>FriendMessage</Text>
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRignt: 20,
    backgroundColor: 'light-gray',
  },
});

export default FriendMessageScreen;
