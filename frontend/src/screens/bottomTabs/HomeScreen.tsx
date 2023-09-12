import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from 'react-native';
import HomeAsset from '../../components/homes/HomeAsset';
import HomeSpend from '../../components/homes/HomeSpend';
import HomeCardSpend from '../../components/homes/HomeCardSpend';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import MainPageHeader from '../../components/MainPageHeader';
type DrawerProps = {
  navigation: {
    openDrawer: () => void;
  };
};

const HomeScreen: React.FC<DrawerProps> = () => {
  const navigation = useNavigation<DrawerProps['navigation']>();
  return (
    <SafeAreaView style={styles.container}>
      <MainPageHeader />
      <HomeAsset />
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Text>버튼</Text>
      </TouchableOpacity>
      <HomeSpend />
      <HomeCardSpend />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
