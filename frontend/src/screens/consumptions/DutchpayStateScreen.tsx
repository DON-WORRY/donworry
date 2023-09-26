import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import BackHeader from '../../components/BackHeader';
import { Button } from '../../components/logins/Login';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/RootNavigator/Stack';
import { consumptionDutchPayInquiry } from '../../utils/ConsumptionFunctions';
import { Tab, TabView } from '@rneui/themed';

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

type DutchpayStateScreenProps = {
  route: RouteProp<RootStackParamList, 'DutchpayState'>;
};

function formattedPrice(inputPrice: number) {
  const price = new Intl.NumberFormat('en-US').format(inputPrice);
  return price;
}

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const DutchpayStateScreen: React.FC<DutchpayStateScreenProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader screen="Spend" />
      <View style={styles.headerTitleView}>
        <Text style={styles.headerTitleText}>더치페이 현황</Text>
      </View>
      <TabMenu />
    </SafeAreaView>
  );
};

const TabMenu: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [receiveDutchpayTotalList, setReceiveDutchpayTotalList] = useState([]);
  const [sendDutchpayTotalList, setSendDutchpayTotalList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await consumptionDutchPayInquiry();
        if (response) {
          console.log(response.data.receiveDutchpayTotalList);
          setReceiveDutchpayTotalList(response.data.receiveDutchpayTotalList);
          setSendDutchpayTotalList(response.data.sendDutchpayTotalList);
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
  return (
    <ScrollView>
      {props.sendDutchpayTotalList.length > 0 ? (
        props.sendDutchpayTotalList.map((sendDutchpayTotal) => (
          <View
            style={styles.tabContainer}
            key={sendDutchpayTotal.consumptionId}
          >
            <View style={styles.titleTopView}>
              <Text>{sendDutchpayTotal.detail}</Text>
              <Text>{sendDutchpayTotal.memberName}</Text>
            </View>
            <View style={styles.titleBottomView}>
              <Text style={styles.titleBottomPrice}>
                {formattedPrice(sendDutchpayTotal.price)}원
              </Text>
              <Text style={styles.titleBottomMember}>
                인원 {sendDutchpayTotal.dutchpayPersonList.length}명
              </Text>
            </View>
            {sendDutchpayTotal.dutchpayPersonList.map((dutchpayPerson) => (
              <DutchpayFriendList dutchpayPerson={dutchpayPerson} />
            ))}
            <View style={styles.sendMemberView}>
              <Text style={styles.sendMemberText}>보낸인원 1/3</Text>
            </View>
            <Button
              title="송금하기"
              onPress={() => console.log('click')}
              widthPercentage={0.9}
            />
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
        props.receiveDutchpayTotalList.map((receiveDutchpayTotal) => (
          <View
            style={styles.tabContainer}
            key={receiveDutchpayTotal.consumptionId}
          >
            <View style={styles.titleTopView}>
              <Text>{receiveDutchpayTotal.detail}</Text>
              <Text>{receiveDutchpayTotal.memberName}</Text>
            </View>
            <View style={styles.titleBottomView}>
              <Text style={styles.titleBottomPrice}>
                {formattedPrice(receiveDutchpayTotal.price)}원
              </Text>
              <Text style={styles.titleBottomMember}>
                인원 {receiveDutchpayTotal.dutchpayPersonList.length}명
              </Text>
            </View>
            {receiveDutchpayTotal.dutchpayPersonList.map((dutchpayPerson) => (
              <DutchpayFriendList dutchpayPerson={dutchpayPerson} />
            ))}
            <View style={styles.sendMemberView}>
              <Text style={styles.sendMemberText}>보낸인원 1/3</Text>
            </View>
          </View>
        ))
      ) : (
        <Text>데이터가 없습니다.</Text>
      )}
    </ScrollView>
  );
};

const DutchpayFriendList: React.FC<DutchpayFriendList> = (props) => {
  return (
    <View style={styles.contentBox} key={props.dutchpayPerson.detailDutchpayId}>
      <View style={styles.contentBoxView}>
        <View style={styles.contentBoxLeftView}>
          <Text style={styles.contentBoxName}>{props.dutchpayPerson.name}</Text>
        </View>
        <View style={styles.contentBoxLeftView}>
          <FontAwesome name="close" size={40} color="red" />
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
  container: {
    flex: 1,
  },
  headerTitleView: {
    width: width * 0.9,
    marginBottom: 10,
    marginLeft: 10,
  },
  headerTitleText: {
    fontSize: 30,
    fontWeight: '700',
  },
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
});

export default DutchpayStateScreen;
