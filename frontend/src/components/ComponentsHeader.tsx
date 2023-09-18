import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setMypageModal } from '../store/Modal';

type DrawerProps = {
  navigation: {
    openDrawer: () => void;
  };
};
const donWorryHeader = require('../assets/logo/DonWorryHeader.png');
const screenWidth = Dimensions.get('screen').width;

const ComponentsHeader: React.FC = () => {
  const navigation = useNavigation<DrawerProps['navigation']>();
  const dispatch = useDispatch();

  function handleMenuClick() {
    dispatch(setMypageModal(false));
    navigation.openDrawer();
  }

  return (
    <View style={styles.header}>
      <Image
        source={donWorryHeader}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={handleMenuClick}>
        <FontAwesome name="bars" size={30} color={'#808080'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: screenWidth - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    height: screenWidth * 0.1,
    width: screenWidth * 0.37,
  },
});

export default ComponentsHeader;
