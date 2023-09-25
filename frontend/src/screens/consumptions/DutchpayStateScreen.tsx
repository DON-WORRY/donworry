import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Dimensions } from 'react-native';
import BackHeader from '../../components/BackHeader';
import { Button } from '../../components/logins/Login';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/RootNavigator/Stack';

type DutchpayStateScreenProps = {
  route: RouteProp<RootStackParamList, 'DutchpayState'>;
};

const DutchpayStateScreen: React.FC<DutchpayStateScreenProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader screen="Spend" />
      <View style={styles.headerTitleView}>
        <Text style={styles.headerTitleText}>더치페이 현황</Text>
      </View>
      <DutchpayFriendsGroup />
    </SafeAreaView>
  );
};

const DutchpayFriendsGroup: React.FC = () => {
  return (
    <View>
      <View style={styles.titleTopView}>
        <Text>수완초밥&참치</Text>
        <Text>나종현</Text>
      </View>
      <View style={styles.titleBottomView}>
        <Text style={styles.titleBottomPrice}>100,000원</Text>
        <Text style={styles.titleBottomMember}>인원 3명</Text>
      </View>
      <DutchpayFriendList />
      <DutchpayFriendList />
      <DutchpayFriendList />
      <View style={styles.sendMemberView}>
        <Text style={styles.sendMemberText}>보낸인원 1/3</Text>
      </View>
      <Button
        title="송금하기"
        onPress={() => console.log('click')}
        widthPercentage={0.9}
      />
    </View>
  );
};

const DutchpayFriendList: React.FC = () => {
  return (
    <View style={styles.contentBox}>
      <View style={styles.contentBoxView}>
        <View style={styles.contentBoxLeftView}>
          <Text style={styles.contentBoxName}>김동현</Text>
        </View>
        <View style={styles.contentBoxLeftView}>
          <FontAwesome name="close" size={40} color="red" />
        </View>
        <View style={styles.contentBoxRightView}>
          <Text style={styles.contentBoxText}>수령 금액</Text>
          <Text style={styles.contentBoxText}>0원</Text>
        </View>
        <View style={styles.contentBoxRightView}>
          <Text style={styles.contentBoxText}>요청 금액</Text>
          <Text style={styles.contentBoxText}>20,800원</Text>
        </View>
      </View>
    </View>
  );
};
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitleView: {
    width: width * 0.9,
  },
  headerTitleText: {
    fontSize: 30,
    fontWeight: '700',
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
