import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  friendRequestList,
  friendCheck,
  friendRequest,
} from '../FriendFunctions';

const FriendController: React.FC = () => {
  function testHandle() {
    console.log('==========friend=========');
    friendRequestList()
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        testHandle();
      }}
    >
      <Text style={styles.text}>Friend Controller</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 200,
    backgroundColor: '#7777F3',
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FriendController;
