import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

// 함수
import { consumptionCategoryTotal } from '../../utils/ConsumptionFunctions';
import {
  friendListInquiry,
  friendTotalSpend,
} from '../../utils/FriendFunctions';

import FriendCubes from './children/FriendCubes';
import FriendSpendHeader from './children/FriendSpendHeader';
import FriendSpendChart from './children/FriendSpendChart';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 토큰 가져오기 함수
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};
/*
public class CategoryAmountResponse {
    private Long food;
    private Long transport;
    private Long life;
    private Long hobby;
    private Long style;
    private Long etc;
}
*/

type CategoryAmountList = CategoryAmount[];

type CategoryAmount = {
  amount: number;
  category: string;
};

const nowDate = new Date();
const nowMonth = nowDate.getMonth() + 1;
// const kingsAmount = {
//   food: 240000,
//   transport: 100000,
//   hobby: 50000,
//   life: 180000,
//   etc: 500000,
//   style: 30000,
// };

// const friendsNumber = 5;
// const rank = 3;
type Friend = {
  friendId: number;
  friendName: string;
  friendEmail: string;
};

const FriendSpendKing: React.FC = () => {
  const [rank, setRank] = useState(0);
  const [friendsNumber, setFriendsNumber] = useState(0);
  const [myName, setMyName] = useState<string | undefined>(undefined);
  const [MycategoryList, setMyCategoryList] = useState<CategoryAmountList>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendsMinValues, setFriendsMinValues] = useState<CategoryAmountList>(
    []
  );
  // 1. 이름을 가져옵니다.
  useEffect(() => {
    const fetchName = async () => {
      const newName = await getData('memberName');
      setMyName(newName);
    };
    fetchName();
  }, []);

  // 2. 이름이 바뀌면 카테고리 리스트 데이터를 가져옵니다.
  useEffect(() => {
    const fetchCategoryList = async () => {
      const myCategoryListData = await consumptionCategoryTotal(nowMonth)
        .then((r) => r.data.categoryAmountList)
        .catch((e) => console.error(e));
      setMyCategoryList(myCategoryListData);
    };

    if (myName) {
      // 이름이 존재할 때만 실행
      fetchCategoryList();
    }
  }, [myName]);

  // 3. 카테고리 리스트 데이터가 바뀌면 친구 목록을 가져옵니다.
  useEffect(() => {
    const fetchFriendList = async () => {
      const data = await friendListInquiry()
        .then((r) => r.data.friendResponseList)
        .catch((e) => console.error(e));
      setFriends(data);
      setFriendsNumber(data.length);
    };

    if (MycategoryList) {
      // 카테고리 리스트 데이터가 있을 때만 실행
      fetchFriendList();
    }
  }, [MycategoryList]);

  // 4. 친구 목록이 바뀌면 친구들의 지출 데이터를 가져옵니다.
  useEffect(() => {
    const fetchFriendExpenditure = async () => {
      const tmp = await Promise.all(
        friends.map(async (f) => {
          const smallData = {
            id: f.friendId,
            month: nowMonth,
          };
          return await friendTotalSpend(smallData)
            .then((r) => ({ value: r.data.categoryAmountList }))
            .catch((e) => console.error(e));
        })
      );
      console.log('tmp', tmp);
      const allValues = tmp.flatMap((item) => item.value);
      console.log('allValues', allValues);

      const groupedByCategory = allValues.reduce((acc, curr) => {
        if (!acc[curr.category]) {
          acc[curr.category] = [];
        }
        acc[curr.category].push(curr.amount);
        return acc;
      }, {});

      console.log(groupedByCategory);

      const minValuesByCategory = [];
      for (const category in groupedByCategory) {
        const minValue = Math.min(...groupedByCategory[category]);
        minValuesByCategory.push({ category, amount: minValue });
      }

      console.log('minvalue', minValuesByCategory);
      setFriendsMinValues(minValuesByCategory);
    };

    if (friends && friends.length > 0) {
      // 친구 목록이 있을 때만 실행
      fetchFriendExpenditure();
    }
  }, [friends]);
  // 빈 배열을 전달하여 한 번만 실행되도록 함
  return (
    <View style={styles.container}>
      <FriendSpendHeader friendsNumber={friendsNumber} rank={rank} />
      <FriendCubes myName={myName} />
      <FriendSpendChart
        kingsAmount={friendsMinValues}
        myAmount={MycategoryList}
      />
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    height: 525,
    padding: 20,
    width: screenWidth - 40,
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  goldCube: {
    color: '#FFD700',
  },
  myCube: {
    color: '#7777F3',
  },
});

export default FriendSpendKing;
