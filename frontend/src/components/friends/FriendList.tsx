import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
const screenWidth = Dimensions.get('screen').width;

const FriendList: React.FC = () => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      alwaysBounceHorizontal={true}
    ></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 470,
    padding: 20,
    width: screenWidth - 40,
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 100
  },
});

export default FriendList;
