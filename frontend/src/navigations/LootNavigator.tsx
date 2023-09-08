import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigation from './LootNavigator/Stack';
import TabNavigation from './LootNavigator/Tab';

const Root = createStackNavigator();

const LootNavigator: React.FC = () => {
  return (
    <Root.Navigator>
      <Root.Screen
        name="StackNavigation"
        component={StackNavigation}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name="Layout"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
    </Root.Navigator>
  );
};

export default LootNavigator;
