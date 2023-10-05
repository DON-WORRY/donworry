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
    replace: (screen: string, params?: any) => void;
  };
}

type SendingCompleteScreenProps = {
  route: {
    params: {
      source: number;
    };
  };
};

const width = Dimensions.get('screen').width;

const SendingCompleteScreen: React.FC<SendingCompleteScreenProps> = ({ route }) => {
  const { source } = route.params;
  const navigation = useNavigation<ScreenProps['navigation']>();
  const completeImage = require('../assets/logo/Sending.png');

  const whereGo = () => {
    console.log(source)
    if (source === 1) {
      navigation.navigate('Asset', { refresh: Date.now() });
    }
    else if (source === 2) {
      navigation.replace('StackNavigation', {
        screen: 'DutchpayState',
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>송금이</Text>
      <Text style={styles.headText}>완료되었어요</Text>
      <Image style={styles.sendingImage} source={completeImage} />
      <View style={styles.button}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            whereGo()
          }}
          activeOpacity={0.5}
        >
          <Text style={styles.text}>돌아가기</Text>
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
  sendingImage: {
    width: width * 0.6,
    height: width * 0.6,
    marginTop: width * 0.2,
    marginBottom: width * 0.2,
  },
  button: {
    backgroundColor: '#EBDDF7',
    borderRadius: 10,
    width: width * 0.5,
    height: width * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#D4C2E8',
},

  text: {
    color: 'gray',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SendingCompleteScreen;
