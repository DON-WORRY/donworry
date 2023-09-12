import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigation from './Stack';
import TabNavigation from './Tab';

const Root = createStackNavigator();

const ChildrenNavigation: React.FC = () => {
  return (
    <Root.Navigator initialRouteName="StackNavigation">
      <Root.Screen
        name="StackNavigation"
        component={StackNavigation}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
    </Root.Navigator>
  );
};

export default ChildrenNavigation;
