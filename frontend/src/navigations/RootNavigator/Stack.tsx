import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
import FriendMessageScreen from '../../screens/friends/FriendMessageScreen';
// import DutchpayRequestScreen from '../../screens/consumptions/DutchpayRequestScreen';
import CardHistoryScreen from '../../screens/historys/CardHistoryScreen';
import AccountHistoryScreen from '../../screens/historys/AccountHistoryScreen';
import KakaoLoginScreen from '../../screens/KakaoLoginScreen';

const Stack = createStackNavigator();

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
      {/* <Stack.Screen
        name="DutchpayRequest"
        component={DutchpayRequestScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="CardHistory"
        component={CardHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountHistory"
        component={AccountHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Kakao"
        component={KakaoLoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
