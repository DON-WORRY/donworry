import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import ComponentsHeader from '../../components/ComponentsHeader';
interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const screenWidth = Dimensions.get('screen').width;

const SpendScreen: React.FC = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();

  return (
    <View style={styles.container}>
      <ComponentsHeader />
      <TouchableOpacity
        style={styles.listView}
        onPress={() => {
          navigation.navigate('StackNavigation', { screen: 'DutchpayState' });
        }}
      >
        <Text style={styles.listText}>더치페이 현황</Text>
        <FontAwesome name="angle-right" size={40} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.listView}
        onPress={() => {
          navigation.navigate('StackNavigation', { screen: 'Consumption' });
        }}
      >
        <Text style={styles.listText}>소비 페이지</Text>
        <FontAwesome name="angle-right" size={40} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingLeft: 20,
    width: screenWidth - 40,
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  listText: {
    width: screenWidth - 100,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SpendScreen;
