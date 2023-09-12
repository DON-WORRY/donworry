import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type DrawerProps = {
  navigation: {
    openDrawer: () => void;
  };
};

const MainPageHeader: React.FC = () => {
  const navigation = useNavigation<DrawerProps['navigation']>();

  function handleMenuClick() {
    navigation.openDrawer();
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo/MainPageLogo.png')}
        style={styles.logo_image}
        resizeMode="contain"
      ></Image>
      <TouchableOpacity onPress={handleMenuClick}>
        <Image
          source={require('../assets/user/hambager.png')}
          style={styles.menu_image}
          resizeMode="contain"
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo_image: {
    height: 40,
    width: 100,
  },
  menu_image: {
    height: 40,
    width: 40,
  },
});

export default MainPageHeader;
