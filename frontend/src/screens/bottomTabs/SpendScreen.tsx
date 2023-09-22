import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TestScreen from '../../utils/TestScreen';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}
const consumptionData = {
  conId: 1,
  conName: '수완초밥&참치',
  conMoney: 100000,
};

const SpendScreen: React.FC = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  return (
    <View style={styles.container}>
      <Text>Spend Screen</Text>
      <TouchableOpacity
        style={{ backgroundColor: 'gray', padding: 30 }}
        onPress={() => {
          navigation.navigate('StackNavigation', {
            screen: 'DutchPayRequest',
            params: consumptionData,
          });
        }}
      >
        <Text>소비 내역 중 하나</Text>
      </TouchableOpacity>
      <TestScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpendScreen;
