import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeAsset: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.headText}>자산</Text>
        <MaterialIcons
          style={styles.amountText}
          name="arrow-forward-ios"
          color={'grey'}
          size={width * 0.06}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headText: {
    fontSize: width * 0.06, // 화면 너비의 5%로 폰트 크기 설정
    fontWeight: 'bold',
    textAlign: 'left',
  },
  amountText: {
    textAlign: 'right',
  },
});

export default HomeAsset;
