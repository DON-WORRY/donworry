import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Spend: undefined;
  Asset: undefined;
  Comparison: undefined;
  Friend: undefined;
};

const { width } = Dimensions.get('screen');

const HomeAsset: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Asset'>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('Asset')}
      >
        <Text style={styles.headText}>자산</Text>
        <MaterialIcons
          style={styles.amountText}
          name="arrow-forward-ios"
          color={'grey'}
          size={width * 0.06}
        />
      </TouchableOpacity>
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
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  amountText: {
    textAlign: 'right',
  },
});

export default HomeAsset;
