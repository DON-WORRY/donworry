import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

interface MenuProps {
  imageName?: 'bell' | 'send';
  imageName2?: 'piggy-bank';
  text: string;
}
const MyPageMenu: React.FC<MenuProps> = (props) => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  // navigation.navigate('StackNavigation', { screen: 'NewMassageScreen' });
  function nextScreen(screen: string) {
    if (screen === '내소식') {
      navigation.navigate('StackNavigation', { screen: 'NewMassageScreen' });
    } else if (screen === '계좌선택') {
    } else {
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        nextScreen(props.text)
      }}>
        <View style={styles.touch_view}>
          <View style={styles.image_view}>
            {props.imageName2 === 'piggy-bank' ? (
              <FontAwesome5 name={props.imageName2} size={30} color="#8E8E8F" />
            ) : (
              <FontAwesome name={props.imageName} size={30} color="#8E8E8F" />
            )}
          </View>
          <View style={styles.text_view}>
            <Text style={styles.text}>{props.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 10,
  },
  touch_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image_view: {
    padding: 10,
  },
  text_view: {
    padding: 10,
  },
  text: {
    fontSize: 26,
    color: '#8E8E8F',
    fontWeight: '600',
  },
});

export default MyPageMenu;
