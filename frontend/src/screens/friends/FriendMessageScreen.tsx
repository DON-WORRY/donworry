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
import { useNavigation } from '@react-navigation/native';

interface ScreenProps {
  navigation: {
    goBack: (screen: string, params?: any) => void;
  };
}

const requestData = [
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
];

const responseData = [
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-08-31',
  },
  {
    email: 'oooo@naver.com',
    name: 'test',
    time: '2023-09-01',
  },
];

const FriendMessageScreen: React.FC = () => {
  const blackLogo = require('../../assets/logo/BlackLogo.png');
  const navigation = useNavigation<ScreenProps['navigation']>();
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          onPress={() => {
            navigation.goBack('TabNavigation', { screen: 'Friend' });
          }}
        />
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
          {requestData.map((data, index) => {
            return (
              <View key={index}>
                <FriendRequest
                  email={data.email}
                  name={data.name}
                  time={data.time}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View>
        <Text style={styles.subTitle}>수신 메시지</Text>
        <View style={styles.line}></View>
        <ScrollView style={styles.largeBox}>
          {responseData.map((data, index) => {
            return (
              <View key={index}>
                <FriendResponse
                  email={data.email}
                  name={data.name}
                  time={data.time}
                />
              </View>
            );
          })}
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
    marginBottom: 10,
  },
  line: {
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  largeBox: {
    height: screenHeight / 4,
  },
});

export default FriendMessageScreen;
