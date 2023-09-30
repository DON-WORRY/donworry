import React from 'react';
import { Dimensions } from 'react-native';
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
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.7,
        },
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
