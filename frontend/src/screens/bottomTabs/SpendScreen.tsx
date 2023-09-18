import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}
function SpendScreen() {
  const navigation = useNavigation<ScreenProps['navigation']>();
  return (
    <View style={styles.container}>
      <Text>Spend Screen</Text>
      <TouchableOpacity
        style={{ backgroundColor: 'gray', padding: 30 }}
        onPress={() => {
          navigation.navigate('StackNavigation', { screen: 'DutchPayRequest' });
        }}
      >
        <Text>소비 내역 중 하나</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SpendScreen;
