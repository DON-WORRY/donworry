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
  const [rank, setRank] = useState(0)
  const [friendsNumber, setFriendsNumber] = useState(0)
  const [myName, setMyName] = useState<string | undefined>(undefined);
  const [MycategoryList, setMyCategoryList] = useState<CategoryAmountList>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendsMinValues, setFriendsMinValues] = useState<CategoryAmountList>(
    []
  );
  useEffect(() => {
    const fetch = async () => {
      const newName = await getData('memberName');
      const myCategoryListData = await consumptionCategoryTotal(nowMonth)
        .then((r) => {
          return r.data.categoryAmountList;
        })
        .catch((e) => {
          console.error(e);
        });
      setMyName(newName);
      setMyCategoryList(myCategoryListData);
      const data = await friendListInquiry()
        .then((r) => {
          // console.log(r)
          return r.data.friendResponseList;
        })
        .catch((e) => {
          throw e;
        });
      await setFriends(data);
      await setFriendsNumber(data.length)
      // 데이터를 가져온 다음에 새로 취합한다.
      const AmountList = [];
      const tmp = await Promise.all(
        friends.map(async (f) => {
          // console.log("test", f)
          const smallData = {
            id: f.friendId,
            month: nowMonth,
          };
          const nowValue = await friendTotalSpend(smallData)
            .then((r) => {
              return r.data.categoryAmountList;
            })
            .catch((e) => {
              console.error(e);
            });
          // console.log(nowValue)
          // console.log(MycategoryList)
          return { value: nowValue };
        })
      );
      // await console.log('tmp', tmp);
      const allValues = await tmp.flatMap((item) => item.value);

      // 카테고리별로 데이터를 그룹화합니다.
      const groupedByCategory = await Promise.all (allValues.reduce((acc, curr) => {
        if (!acc[curr.category]) {
          acc[curr.category] = [];
        }
        acc[curr.category].push(curr.amount);
        return acc;
      }, {}));
      console.log(groupedByCategory);
      // 각 카테고리별로 최소값을 찾습니다.
      const minValuesByCategory = [];

      for (const category in groupedByCategory) {
        const minValue = Math.min(...groupedByCategory[category]);
        minValuesByCategory.push({ category, amount: minValue });
      }

      console.log(minValuesByCategory);
      await setFriendsMinValues(minValuesByCategory);
    };
    fetch();
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 함
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
