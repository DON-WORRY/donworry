import React, { useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AccountController from './testUtils/AccountController';
import CardController from './testUtils/CardController';
import ConsumptionController from './testUtils/ConsumptionController';
import DutchPayController from './testUtils/DutchPayController';

// 값을 가져오기
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // 읽기 에러
    console.error(e);
    throw e;
  }
};
const TestScreen: React.FC = () => {
  return (
    <View>
      <AccountController />
      <CardController />
      <ConsumptionController />
      <DutchPayController />
    </View>
  );
};

export default TestScreen;
