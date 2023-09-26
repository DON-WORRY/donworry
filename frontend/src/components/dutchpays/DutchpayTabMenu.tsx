import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../../components/logins/Login';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/RootNavigator/Stack';
import { consumptionDutchPayInquiry } from '../../utils/ConsumptionFunctions';
import { Tab, TabView } from '@rneui/themed';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { getData } from '../../utils/ConsumptionFunctions';
import { consumptionDutchPayPriceSend } from '../../utils/ConsumptionFunctions';
import { useNavigation } from '@react-navigation/native';

interface ScreenProps {
  navigation: {
    replace: (screen: string, params?: any) => void;
  };
}

interface DutchpayFriendsSendGroup {
  sendDutchpayTotalList: {
    consumptionId: number;
    detail: string;
    memberName: string;
    price: number;
    reqMemberSize: number;
    myDetailDutchpayId: number;
    dutchpayId: number;
    dutchpayPersonList: {
      detailDutchpayId: number;
      name: string;
      dutchpayStatus: 'NOTSTART' | 'PROGRESS' | 'COMPLETE';
      dutchpayReceivedPrice: number;
      dutchpayReqPrice: number;
    }[];
  }[];
}

interface DutchpayFriendsReceiveGroup {
  receiveDutchpayTotalList: {
    consumptionId: number;
    detail: string;
    memberName: string;
    price: number;
    reqMemberSize: number;
    myDetailDutchpayId: number;
    dutchpayId: number;
    dutchpayPersonList: {
      detailDutchpayId: number;
      name: string;
      dutchpayStatus: 'NOTSTART' | 'PROGRESS' | 'COMPLETE';
      dutchpayReceivedPrice: number;
      dutchpayReqPrice: number;
    }[];
  }[];
}

interface DutchpayFriendList {
  dutchpayPerson: {
    detailDutchpayId: number;
    name: string;
    dutchpayStatus: 'NOTSTART' | 'PROGRESS' | 'COMPLETE';
    dutchpayReceivedPrice: number;
    dutchpayReqPrice: number;
  };
}

function formattedPrice(inputPrice: number) {
  const price = new Intl.NumberFormat('en-US').format(inputPrice);
  return price;
}

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const DutchpayTabMenu: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [receiveDutchpayTotalList, setReceiveDutchpayTotalList] = useState([]);
  const [sendDutchpayTotalList, setSendDutchpayTotalList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await consumptionDutchPayInquiry();
        if (response) {
          setReceiveDutchpayTotalList(response.data.receiveDutchpayTotalList);
          setSendDutchpayTotalList(response.data.sendDutchpayTotalList);
          console.log(response.data);
        } else {
          console.error('API response does not contain data.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <View>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        dense
        indicatorStyle={{
          backgroundColor: 'black',
        }}
      >
        <Tab.Item titleStyle={{ color: 'black' }}>요청한 더치페이</Tab.Item>
        <Tab.Item titleStyle={{ color: 'black' }}>요청받은 더치페이</Tab.Item>
      </Tab>
      <TabView value={index} onChange={setIndex}>
        <TabView.Item
          style={{
            width: '100%',
            alignItems: 'center',
            height: height * 0.75,
          }}
        >
          <DutchpayFriendsReceiveGroup
            receiveDutchpayTotalList={receiveDutchpayTotalList}
          />
        </TabView.Item>
        <TabView.Item
          style={{
            width: '100%',
            alignItems: 'center',
            height: height * 0.75,
          }}
        >
          <DutchpayFriendsSendGroup
            sendDutchpayTotalList={sendDutchpayTotalList}
          />
        </TabView.Item>
      </TabView>
    </View>
  );
};

const DutchpayFriendsSendGroup: React.FC<DutchpayFriendsSendGroup> = (
  props
) => {
  const snapPoints = useMemo(() => ['35%'], []);
  const bottomSheetModalRef: React.RefObject<any> = useRef(null);
  const navigation = useNavigation<ScreenProps['navigation']>();
  const [selectedMemberId, setSelectedMemberId] = useState(0);
  const [selectedMemberName, setSelectedMemberName] = useState('');
  const [selectedMemberPrice, setSelectedMemberPrice] = useState(0);

  function handlePriceSend() {
    async function sendDutchpayData(data: {
      detailDutchpayId: number;
      sendPrice: number;
      simplePassword: string;
    }) {
      try {
        const response = await consumptionDutchPayPriceSend(data);
        if (response) {
          console.log(response);
        } else {
          console.error('API response does not contain data.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    const data = {
      detailDutchpayId: selectedMemberId,
      sendPrice: selectedMemberPrice,
      simplePassword: '123',
    };
    sendDutchpayData(data);
    navigation.replace('StackNavigation', {
      screen: 'DutchpayState',
    });
  }
  return (
    <ScrollView>
      {props.sendDutchpayTotalList.length > 0 ? (
        props.sendDutchpayTotalList.map((sendDutchpayTotal, index) => (
          <View style={styles.tabContainer} key={sendDutchpayTotal.dutchpayId}>
            <View style={styles.titleTopView}>
              <Text>{sendDutchpayTotal.detail}</Text>
              <Text>{sendDutchpayTotal.memberName}</Text>
            </View>
            <View style={styles.titleBottomView}>
              <Text style={styles.titleBottomPrice}>
                {formattedPrice(sendDutchpayTotal.price)}원
              </Text>
              <Text style={styles.titleBottomMember}>
                인원 {sendDutchpayTotal.reqMemberSize}명
              </Text>
            </View>
            {sendDutchpayTotal.dutchpayPersonList.map((dutchpayPerson) => (
              <DutchpayFriendList
                dutchpayPerson={dutchpayPerson}
                key={dutchpayPerson.detailDutchpayId}
              />
            ))}
            <View style={styles.sendMemberView}>
              <Text style={styles.sendMemberText}>
                보낸인원 0/{sendDutchpayTotal.reqMemberSize}
              </Text>
            </View>
            <Button
              title="송금하기"
              onPress={async () => {
                setSelectedMemberId(sendDutchpayTotal.myDetailDutchpayId);
                setSelectedMemberName(sendDutchpayTotal.memberName);
                const myName = await getData('memberName');
                const selectedMember =
                  sendDutchpayTotal.dutchpayPersonList.find(
                    (item) => item.name === myName
                  );

                if (selectedMember) {
                  setSelectedMemberPrice(selectedMember.dutchpayReqPrice);
                }
                bottomSheetModalRef.current.present();
              }}
              widthPercentage={0.9}
            />
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalHeaderView}>
                  <View></View>
                  <TouchableOpacity
                    onPress={() => bottomSheetModalRef.current.dismiss()}
                  >
                    <AntDesign name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text>{selectedMemberName}에게</Text>
                </View>
                <View>
                  <Text>{selectedMemberPrice}원</Text>
                </View>
                <View>
                  <Text>을 보낼까요?</Text>
                </View>
                <Button title="송금" onPress={handlePriceSend} />
              </View>
            </BottomSheetModal>
          </View>
        ))
      ) : (
        <Text>데이터가 없습니다.</Text>
      )}
    </ScrollView>
  );
};

const DutchpayFriendsReceiveGroup: React.FC<DutchpayFriendsReceiveGroup> = (
  props
) => {
  return (
    <ScrollView>
      {props.receiveDutchpayTotalList.length > 0 ? (
        props.receiveDutchpayTotalList.map((receiveDutchpayTotal, index) => (
          <View
            style={styles.tabContainer}
            key={receiveDutchpayTotal.dutchpayId}
          >
            <View style={styles.titleTopView}>
              <Text>{receiveDutchpayTotal.detail}</Text>
            </View>
            <View style={styles.titleBottomView}>
              <Text style={styles.titleBottomPrice}>
                {formattedPrice(receiveDutchpayTotal.price)}원
              </Text>
              <Text style={styles.titleBottomMember}></Text>
            </View>
            {receiveDutchpayTotal.dutchpayPersonList.map((dutchpayPerson) => (
              <DutchpayFriendList
                dutchpayPerson={dutchpayPerson}
                key={dutchpayPerson.detailDutchpayId}
              />
            ))}
            <View style={styles.sendMemberView}>
              <Text style={styles.sendMemberText}>
                보낸인원 0/{receiveDutchpayTotal.reqMemberSize}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <View>
          <Text>데이터가 없습니다.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const DutchpayFriendList: React.FC<DutchpayFriendList> = (props) => {
  return (
    <View style={styles.contentBox}>
      <View style={styles.contentBoxView}>
        <View style={styles.contentBoxLeftView}>
          <Text style={styles.contentBoxName}>{props.dutchpayPerson.name}</Text>
        </View>
        <View style={styles.contentBoxLeftView}>
          {props.dutchpayPerson.dutchpayStatus === 'COMPLETE' ? (
            <Entypo name="check" size={40} color="green" />
          ) : (
            <FontAwesome name="close" size={40} color="red" />
          )}
        </View>
        <View style={styles.contentBoxRightView}>
          <Text style={styles.contentBoxText}>수령 금액</Text>
          <Text style={styles.contentBoxText}>
            {formattedPrice(props.dutchpayPerson.dutchpayReceivedPrice)}원
          </Text>
        </View>
        <View style={styles.contentBoxRightView}>
          <Text style={styles.contentBoxText}>요청 금액</Text>
          <Text style={styles.contentBoxText}>
            {formattedPrice(props.dutchpayPerson.dutchpayReqPrice)}원
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBottomPrice: {
    fontSize: 25,
    fontWeight: '700',
  },
  titleBottomMember: {
    fontSize: 25,
    fontWeight: '700',
  },
  sendMemberView: {
    alignSelf: 'flex-end',
  },
  sendMemberText: {
    fontSize: 18,
    fontWeight: '600',
  },
  contentBox: {
    backgroundColor: '#fff',
    borderRadius: 13,
    padding: 10,
    marginBottom: 10,
    width: width * 0.9,
  },
  contentBoxView: {
    flexDirection: 'row',
    height: height * 0.05,
    justifyContent: 'space-around',
  },
  contentBoxName: {
    fontSize: 20,
    fontWeight: '700',
  },
  contentBoxLeftView: {
    alignSelf: 'center',
  },
  contentBoxRightView: {
    justifyContent: 'space-between',
    height: height * 0.05,
    alignItems: 'center',
  },
  contentBoxText: {
    fontSize: 15,
    fontWeight: '500',
  },
  modalContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'gray',
  },
  modalHeaderView: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DutchpayTabMenu;
