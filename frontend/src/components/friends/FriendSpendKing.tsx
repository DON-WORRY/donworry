import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

// 함수
import { consumptionCategoryTotal } from '../../utils/ConsumptionFunctions';

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

type CategoryAmountList = CategoryAmount[]

type CategoryAmount = {
  amount: number,
  category: string
}

const nowDate = new Date
const nowMonth = nowDate.getMonth() + 1
const kingsAmount = {
  food: 240000,
  transport: 100000,
  hobby: 50000,
  life: 180000,
  etc: 500000,
  style: 30000,
};

const friendsNumber = 5;
const rank = 3;

const FriendSpendKing: React.FC = () => {
  const [myName, setMyName] = useState<string | undefined>(undefined);
  const [MycategoryList, setMyCategoryList] = useState<CategoryAmountList>([]);
  useEffect(() => {
    const fetch = async () => {
      const newName = await getData("memberName")
      const myCategoryListData = await consumptionCategoryTotal(nowMonth)
      .then((r) => {return r.data.categoryAmountList}).catch((e) => {console.error(e)})
      setMyName(newName)
      setMyCategoryList(myCategoryListData)
    };
    fetch();
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 함
  return (
    <View style={styles.container}>
      <FriendSpendHeader friendsNumber={friendsNumber} rank={rank} />
      <FriendCubes myName={myName} />
      <FriendSpendChart kingsAmount={MycategoryList} myAmount={MycategoryList} />
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
