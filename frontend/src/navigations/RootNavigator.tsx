import React from 'react';
import ChildrenNavigator from './RootNavigator/ChildrenNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyPage from '../components/mypages/MyPage';

const Root = createDrawerNavigator();

const RootNavigator: React.FC = () => {
  return (
    <Root.Navigator
      screenOptions={{
        drawerPosition: 'left',
        drawerType: 'front',
        headerShown: false,
        swipeEnabled: false,
      }}
      backBehavior="history"
      drawerContent={MyPage}
    >
      <Root.Screen
        name="ChildrenNavigator"
        component={ChildrenNavigator}
        options={{ drawerLabel: '' }}
      />
    </Root.Navigator>
  );
};

export default RootNavigator;
