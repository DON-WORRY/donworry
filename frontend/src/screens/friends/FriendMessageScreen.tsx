import React, { useEffect, useState } from 'react';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import FriendRequest from '../../components/friends/FriendRequest';
import FriendResponse from '../../components/friends/FriendResponse';
import { useNavigation } from '@react-navigation/native';
import FriendSendRequest from '../../components/friends/FriendSendRequest';

// 함수 입력
import { friendRequestList } from '../../utils/FriendFunctions';

interface ScreenProps {
  navigation: {
    goBack: (screen: string, params?: any) => void;
  };
}

type ReceivedRequest = {
  friendRequestId: number;
  memberId: number;
  memberEmail: string;
  memberName: string;
  createdTime: string;
};

type SendRequest = {
  friendRequestId: number;
  memberId: number;
  memberEmail: string;
  memberName: string;
  createdTime: string;
};

type CheckResponseData = {
  receivedRequest: ReceivedRequest[];
  sendRequest: SendRequest[];
};

const FriendMessageScreen: React.FC = () => {
  const blackLogo = require('../../assets/logo/BlackLogo.png');
  const navigation = useNavigation<ScreenProps['navigation']>();
  // const [newMemberId, setNewMemberId] = useState('');
  const [howCompoShow, setHowCompoShow] = useState({
    isFirst: true,
    isSecond: false,
    isThird: false,
  });
  const [receivedRequest, setReceivedRequest] = useState<ReceivedRequest[]>([]);
  const [sendRequest, setSendRequest] = useState<SendRequest[]>([]);
  const [rendering, setRendering] = useState(true);

  // 바로 렌더링 할 수 있게 하는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await friendRequestList();
        const allRequstList = response.data;
        setReceivedRequest(allRequstList.receivedRequest);
        setSendRequest(allRequstList.sendRequest);
        setRendering(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [rendering == false]);
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.header_box}>
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
          <Text style={styles.header_text}>친구 요청 및 수신</Text>
        </View>
        <View>
          <View style={styles.sub_title_box}>
            <TouchableOpacity
              onPress={() => {
                setHowCompoShow({
                  isFirst: true,
                  isSecond: false,
                  isThird: false,
                });
              }}
            >
              <Text
                style={[
                  styles.sub_title,
                  howCompoShow.isFirst ? styles.selected_title : null,
                ]}
              >
                친구 요청하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHowCompoShow({
                  isFirst: false,
                  isSecond: true,
                  isThird: false,
                });
              }}
            >
              <Text
                style={[
                  styles.sub_title,
                  howCompoShow.isSecond ? styles.selected_title : null,
                ]}
              >
                수신 메시지
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHowCompoShow({
                  isFirst: false,
                  isSecond: false,
                  isThird: true,
                });
              }}
            >
              <Text
                style={[
                  styles.sub_title,
                  howCompoShow.isThird ? styles.selected_title : null,
                ]}
              >
                요청 메시지
              </Text>
            </TouchableOpacity>
          </View>
          {/* 막대선 */}
          <View style={styles.line}></View>

          {howCompoShow.isFirst ? (
            <>
              <FriendSendRequest
                setHowCompoShow={setHowCompoShow}
                setRendering={setRendering}
              />
            </>
          ) : howCompoShow.isSecond ? (
            <>
              <ScrollView
                style={styles.large_box}
                showsVerticalScrollIndicator={false}
                alwaysBounceHorizontal={true}
              >
                {receivedRequest.length > 0 ? (
                  <>
                    {receivedRequest.map((data, index) => {
                      return (
                        <View key={index}>
                          <FriendRequest
                            email={data.memberEmail}
                            name={data.memberName}
                            time={data.createdTime}
                            friendRequestId={data.friendRequestId}
                            memberId={data.memberId}
                            setRendering={setRendering}
                          />
                        </View>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </ScrollView>
            </>
          ) : (
            <>
              <ScrollView
                style={styles.large_box}
                showsVerticalScrollIndicator={false}
                alwaysBounceHorizontal={true}
              >
                {sendRequest.length > 0 ? (
                  <>
                    {sendRequest.map((data, index) => {
                      return (
                        <View key={index}>
                          <FriendResponse
                            email={data.memberEmail}
                            name={data.memberName}
                            time={data.createdTime}
                            friendRequestId={data.friendRequestId}
                            memberId={data.memberId}
                            setRendering={setRendering}
                          />
                        </View>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    marginLeft: 5,
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
    // justifyContent: "space-between"
  },
  selected_title: {
    color: '#7777F3',
  },
});

export default FriendMessageScreen;
