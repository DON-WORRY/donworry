import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import FriendRequest from '../../components/friends/FriendRequest';
import FriendResponse from '../../components/friends/FriendResponse';

const requestData = [
  {
    email: "oooo@naver.com",
    name: "test"
  },
  {
    email: "oooo@naver.com",
    name: "test"
  },
  {
    email: "oooo@naver.com",
    name: "test"
  },
  {
    email: "oooo@naver.com",
    name: "test"
  },
  {
    email: "oooo@naver.com",
    name: "test"
  },
  {
    email: "oooo@naver.com",
    name: "test"
  },
  {
    email: "oooo@naver.com",
    name: "test"
  },
  {
    email: "oooo@naver.com",
    name: "test"
  },
]

const responseData = []


const FriendMessageScreen: React.FC = () => {
  const blackLogo = require('../../assets/logo/BlackLogo.png');
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <MaterialCommunityIcons name="arrow-left" size={30} />
        <Image source={blackLogo} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.headerText}>친구 요청 및 수신</Text>
      </View>
      <View>
        <Text style={styles.subTitle}>요청 메시지</Text>
        {/* 막대선 */}
        <View style={styles.line}></View>
        <ScrollView style={styles.largeBox}>
          <FriendRequest />
        </ScrollView>
      </View>
      <View>
        <Text style={styles.subTitle}>수신 메시지</Text>
        <View style={styles.line}></View>
        <ScrollView style={styles.largeBox}>
          <FriendResponse />
        </ScrollView>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'light-gray',
  },
  logo: {
    height: 40,
    width: 40,
  },
  headerBox: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignContent: 'space-between',
    width: screenWidth - 40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  line: {
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 5,
  },
  largeBox: {
    height: screenHeight / 4,
  },
});

export default FriendMessageScreen;
