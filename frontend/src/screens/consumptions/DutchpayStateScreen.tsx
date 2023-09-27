import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import BackHeader from '../../components/BackHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/RootNavigator/Stack';
import DutchpayTabMenu from '../../components/dutchpays/DutchpayTabMenu';

type DutchpayStateScreenProps = {
  route: RouteProp<RootStackParamList, 'DutchpayState'>;
};

const width = Dimensions.get('screen').width;

const DutchpayStateScreen: React.FC<DutchpayStateScreenProps> = () => {
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <BackHeader screen="Spend" />
        <View style={styles.headerTitleView}>
          <Text style={styles.headerTitleText}>더치페이 현황</Text>
        </View>
        <DutchpayTabMenu />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 60 : 0,
  },
  headerTitleView: {
    width: width * 0.9,
    marginBottom: 10,
    marginLeft: 10,
  },
  headerTitleText: {
    fontSize: 30,
    fontWeight: '700',
  },
});

export default DutchpayStateScreen;
