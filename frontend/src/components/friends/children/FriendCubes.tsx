import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FriendCubesProps {
  myName: string | undefined;
}

// 값을 가져오기
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const King = require('../../../assets/friends/King.png');
const Female = require('../../../assets/friends/Female.png');
const Male = require('../../../assets/friends/Male.png');

const FriendCubes: React.FC<FriendCubesProps> = (props) => {
  const [myGender, setMyGender] = useState('');
  useEffect(() => {
    async function fetch() {
      const nowGender = await getData('memberGender');
      if (nowGender != undefined) {
        setMyGender(nowGender);
      }
      console.log(nowGender)
    }
    fetch();
  });
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.smallBox}>
          {/* <FontAwesome name="cube" size={100} style={styles.myCube} /> */}
          {myGender === 'MALE' ? (
            <Image source={Male} style={styles.myImage} />
          ) : (
            <Image source={Female} style={styles.myImage} />
          )}
          <Text style={styles.nameText}>나</Text>
          <Text style={styles.subNameText}>{props.myName}</Text>
        </View>
        <View style={styles.smallBox}>
          {/* <FontAwesome name="cube" size={100} style={styles.goldCube} /> */}
          <Image source={King} style={styles.kingImage} />
          <Text style={styles.nameText}>최저 소비</Text>
          <Text style={styles.subNameText}>각 소비별 최저 금액</Text>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goldCube: {
    color: '#6081DB',
    marginBottom: 5,
  },
  myCube: {
    color: '#8260DB',
    marginBottom: 5,
  },
  smallBox: {
    alignItems: 'center',
    width: (screenWidth - 80) / 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  line: {
    width: screenWidth - 80,
    height: 0,
    borderBottomWidth: 1, // 또는 borderWidth를 사용하여 두께를 조정할 수 있습니다.
    borderBottomColor: 'gray', // 원하는 색상으로 변경할 수 있습니다.
    marginVertical: 10, // 수평선 위아래의 간격 조정 (선택 사항)
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subNameText: {
    fontSize: 16,
  },
  myImage: {
    width: 112,
    height: 100,
  },
  kingImage: {
    width: 130,
    height: 100,
  },
});

export default FriendCubes;
