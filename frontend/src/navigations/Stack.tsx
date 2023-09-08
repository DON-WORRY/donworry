import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../screens/Loginpage';
import Test from '../components/test';
const Stack = createStackNavigator();

const StackNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Test"
        component={Test}
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
