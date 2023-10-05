import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const width = Dimensions.get('screen').width;

const SendingCompleteScreen: React.FC = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  const completeImage = require('../assets/logo/Sending.png');
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>송금이</Text>
      <Text style={styles.headText}>완료되었어요</Text>
      <Image style={styles.sendingImage} source={completeImage} />
      <View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            navigation.navigate('Asset', { refresh: Date.now() });
          }}
          activeOpacity={0.5}
          // disabled={disabled}
        >
          <Text style={styles.text}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7777F3',
  },
  headText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.1,
  },
  sendingImage: {},
  button: {
    backgroundColor: '#EFF2FB',
    borderRadius: 10,
    width: width * 0.13,
    height: width * 0.09,
    justifyContent: 'center',
    marginTop: width * 0.05,
    zIndex: 2,
  },
  text: {
    fontSize: width * 0.036,
    textAlign: 'center',
  },
});

export default SendingCompleteScreen;
