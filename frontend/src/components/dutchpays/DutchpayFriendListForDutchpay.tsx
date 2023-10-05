import React, { useState, useEffect, Children, ReactNode } from 'react';
import { Text, StyleSheet, Dimensions, ScrollView, View } from 'react-native';

import FriendSearch from '../friends/children/FriendSearch';
import { friendListInquiry } from '../../utils/FriendFunctions';

type Friend = {
  friendId: number;
  friendName: string;
  friendEmail: string;
};

interface FriendListForDutchpayProps {
  children: ReactNode;
}

const FriendListForDutchpay: React.FC<FriendListForDutchpayProps> = ({
  children,
}) => {
  const [friends, setFriends] = useState<Friend[]>([]);

  // 친구 숫자에 따라 다르게 나타나게 구현해야 한다.
  // 친구 숫자가 일정 수를 넘으면 height를 넘은 숫자 만큼 + 40해준다.
  function search(name: string) {
    console.log(name);
  }
  useEffect(() => {
    async function fetch() {
      const data = await friendListInquiry()
        .then((r) => {
          // console.log(r)
          return r.data.friendResponseList;
        })
        .catch((e) => {
          throw e;
        });
      // console.log('freinds', data);
      await setFriends(data);
      console.log(data);
      return;
    }
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>친구 목록</Text>
      {children}
    </View>
  );
};

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: width * 0.9,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  header: {
    alignSelf: 'flex-start',
    fontWeight: '700',
    fontSize: 20,
  },
});

export default FriendListForDutchpay;
