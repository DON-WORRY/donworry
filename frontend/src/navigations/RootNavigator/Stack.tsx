import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import FriendMessageScreen from '../../screens/friends/FriendMessageScreen';
import DutchpayRequestScreen from '../../screens/consumptions/DutchpayRequestScreen';
import HistoryScreen from '../../screens/historys/HistoryScreen';
import ConsumptionScreen from '../../screens/consumptions/ConsumptionScreen';
import DutchpayStateScreen from '../../screens/consumptions/DutchpayStateScreen';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Message: undefined;
  History: undefined;
  Consumption: undefined;
  DutchpayRequest: {
    bankName: string;
    detail: string;
    price: number;
    dateTime: string;
    id: number;
  };
  DutchpayState: {
    bankName: string;
    detail: string;
    price: number;
    dateTime: string;
    id: number;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, freezeOnBlur: true }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{
          headerTintColor: '#808080',
          headerBackTitleVisible: false,
          headerTitle: '회원가입',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Message"
        component={FriendMessageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DutchpayRequest"
        component={DutchpayRequestScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DutchpayState"
        component={DutchpayStateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Consumption"
        component={ConsumptionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
export { RootStackParamList };
