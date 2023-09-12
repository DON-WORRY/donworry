import React from 'react';
import ChildrenNavigator from './RootNavigator/ChildrenNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MypageOpen from '../components/mypages/MypageOpen';
import MyPageClose from '../components/mypages/MyPageClose';
import MyPage from '../components/mypages/MyPage';

const Root = createDrawerNavigator();
// swipeEnabled: false,
const RootNavigator: React.FC = () => {
  return (
    <Root.Navigator
      screenOptions={{
        drawerPosition: 'left',
        drawerType: 'front',
        headerShown: false,
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
