import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
// 함수 모음
import { userLogin } from '../../utils/UserFunctions';
import { friendRequest } from '../../utils/FriendFunctions';
// 로컬 스토리지
import AsyncStorage from '@react-native-async-storage/async-storage';

const addFriendImg = require('../../assets/friends/AddFriend3.png');
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const ratioHeigt = 0.681;
const imageWidth = screenWidth - 40;
const imageHeight = imageWidth * ratioHeigt;

// 값을 가져오기
const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // 읽기 에러
    console.error(e);
    throw e;
  }
};

interface FriendSendRequestProps {
  setHowCompoShow: (howCompo: {
    isFirst: boolean;
    isSecond: boolean;
    isThird: boolean;
  }) => void;
  setRendering: (render: boolean) => void;
}

const FriendSendRequest: React.FC<FriendSendRequestProps> = (props) => {
  const [friendEmail, setFriendEmail] = useState('');
  // 친구 있는지 확인
  async function searchFriend(friendEmail: string) {
    const memberEmail = await getData('memberEmail');
    const data = {
      memberEmail: friendEmail,
      memberPassword: '',
    };
    userLogin(data).catch((e) => {
      const Code = e.code;
      if (friendEmail == memberEmail) {
        return Alert.alert(
          'Error',
          '자기 자신에게 친구 요청을 보낼 수는 없습니다.',
          [{ text: '확인', onPress: () => {} }]
        );
      }
      if (Code == 'M004') {
        console.log('ok');
        return Alert.alert('친구 요청', '친구 요청을 보내시겠습니까?', [
          {
            text: '요청 보내기',
            onPress: () => {
              requestEmail()
                .then(async (r) => {
                  // console.log(r);
                  await setFriendEmail("")
                  await props.setHowCompoShow({
                    isFirst: false,
                    isSecond: false,
                    isThird: true,
                  });
                  await props.setRendering(false)
                })
                .catch((e) => {
                  console.error(e);
                });
            },
          },
          { text: '취소하기', onPress: () => {} },
        ]);
      } else {
        console.log('not ok');
        return Alert.alert(
          '친구 찾기 에러',
          '존재하지 않는 친구입니다. 다시 입력해주세요.'
        );
      }
      // return Alert.alert("존재하지 않는 이메일")
    });
  }
  // 친구 요청 함수
  async function requestEmail() {
    const requestData = {
      memberEmails: [friendEmail],
    };
    friendRequest(requestData)
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.topBox}></View>
      <View>
        <View style={styles.middleBox}>
          <Text style={styles.friendText}>친구 추가를 통해서</Text>

          <Text style={styles.friendText}> 더 많은 사람과 비교를 해보세요</Text>
          <View style={styles.searchBox}>
            <View style={styles.searchTextInputBox}>
              <TextInput
                onChangeText={(text) => {
                  setFriendEmail(text);
                }}
                style={styles.searchTextInput}
                placeholder="이메일을 입력하세요."
              />
              <FontAwesome
                name="search"
                size={40}
                onPress={() => {
                  searchFriend(friendEmail);
                }}
              />
            </View>
          </View>
        </View>
        <Image style={styles.imageSize} source={addFriendImg} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: screenHeight - 260,
  },
  imageSize: {
    height: imageHeight,
    width: imageWidth,
  },
  topBox: {
    padding: 10,
    height: 60,
  },
  middleBox: {
    padding: 10,
    height: screenHeight * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendText: {
    color: '#7777F3',
    fontWeight: 'bold',
    fontSize: 24,
  },
  searchBox: {
    height: 60,
    width: screenWidth - 40,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchTextInputBox: {
    width: screenWidth - 80,
    height: 60,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: '#7777F3',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchTextInput: {
    fontSize: 24,
    fontWeight: 'bold',
    width: screenWidth - 160,
    paddingRight: 10,
  },
});

export default FriendSendRequest;
