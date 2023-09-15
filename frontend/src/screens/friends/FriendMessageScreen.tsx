import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import FriendRequest from '../../components/friends/FriendRequest';
import FriendResponse from '../../components/friends/FriendResponse';
import { useNavigation } from '@react-navigation/native';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    replace: (screen: string, params?: any) => void;
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
  const [isFirst, setIsFirst] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.header_box}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          onPress={() => {
            navigation.replace('TabNavigation', { screen: 'Friend' });
          }}
        />
        <Image source={blackLogo} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.header_text}>친구 요청 및 수신</Text>
      </View>
      <View>
        <View style={styles.sub_title_box}>
          <TouchableOpacity
            onPress={() => {
              setIsFirst(true);
            }}
          >
            <Text
              style={[styles.sub_title, isFirst ? styles.selected_title : null]}
            >
              요청 메시지
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsFirst(false);
            }}
          >
            <Text
              style={[styles.sub_title, isFirst ? null : styles.selected_title]}
            >
              수신 메시지
            </Text>
          </TouchableOpacity>
        </View>
        {/* 막대선 */}
        <View style={styles.line}></View>

        {isFirst ? (
          <>
            <ScrollView
              style={styles.large_box}
              showsVerticalScrollIndicator={false}
              alwaysBounceHorizontal={true}
            >
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
          </>
        ) : (
          <>
            <ScrollView
              style={styles.large_box}
              showsVerticalScrollIndicator={false}
              alwaysBounceHorizontal={true}
            >
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
          </>
        )}
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
  header_box: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth - 40,
  },
  header_text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  sub_title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 5,
    borderRadius: 5,
  },
  line: {
    height: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
  large_box: {
    height: (screenHeight * 2) / 3,
  },
  sub_title_box: {
    flexDirection: 'row',
  },
  selected_title: {
    color: '#7777F3',
  },
});

export default FriendMessageScreen;
