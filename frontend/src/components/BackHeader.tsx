import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface ScreenProps {
  navigation: {
    goBack: (screen: string, params?: any) => void;
  };
}

interface BackProps {
  screen: 'Home' | 'Spend' | 'Asset' | 'Comparison' | 'Friend';
}

const BackHeader: React.FC<BackProps> = (props) => {
  const blackLogo = require('../assets/logo/BlackLogo.png');
  const navigation = useNavigation<ScreenProps['navigation']>();
  return (
    <View style={styles.headerBox}>
      <MaterialCommunityIcons
        name="arrow-left"
        size={30}
        onPress={() => {
          navigation.goBack('Tabnavigation', { screen: props.screen });
        }}
      />
      <Image source={blackLogo} style={styles.logo} />
    </View>
  );
};
const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  logo: {
    height: 40,
    width: 40,
  },
  headerBox: {
    height: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth - 40,
  },
});

export default BackHeader;
