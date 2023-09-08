import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen';
import SignupScreen from '../../screens/SignupScreen';
const Stack = createStackNavigator();

const StackNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
        //freezeOnBlur
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{
          headerTintColor: '#808080',
          headerBackTitleVisible: false,
          headerTitle: '회원가입',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
