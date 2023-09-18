import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import BackHeader from '../../components/BackHeader';
import ContentBox from '../../components/ContentBox';
import FriendSearch from '../../components/friends/children/FriendSearch';
import FriendListItem from '../../components/friends/children/FriendListItem';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps {
  title: string;
  onPress?: () => void;
}

const dummyData = [
  {
    id: 1,
    name: 'test',
    email: 'test@naver.com',
  },
  {
    id: 2,
    name: 'test',
    email: 'test@naver.com',
  },
  {
    id: 3,
    name: 'test',
    email: 'test@naver.com',
  },
  {
    id: 4,
    name: 'test',
    email: 'test@naver.com',
  },
  {
    id: 5,
    name: 'test',
    email: 'test@naver.com',
  },
];

interface DummyProps {
  id: number;
  name: string;
  email: string;
}
const DutchPayRequestScreen: React.FC = () => {
  const [selectedData, setSelectedData] = useState<DummyProps[]>([]);
  function search(name: string) {
    console.log(name);
  }
  function handlePress(dummy: DummyProps) {
    setSelectedData([...selectedData, dummy]);
  }
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader screen="Spend" />
      <ScrollView>
        <Text>더치페이</Text>
        <Text style={styles.amountText}>100,000원</Text>
        <Text>수완초밥&참치</Text>
        <ContentBox>
          <FriendSearch search={search} />
          {dummyData.map((dummy) => {
            return (
              <TouchableOpacity
                key={dummy.id}
                onPress={() => {
                  handlePress(dummy);
                }}
              >
                <FriendListItem friend={dummy} />
              </TouchableOpacity>
            );
          })}
        </ContentBox>
        <View style={styles.middleView}>
          <View>
            <Text style={styles.currentMemberText}>현재 인원 4명</Text>
          </View>
          <Text style={styles.remainingAmountText}>남은 금액 0</Text>
        </View>
        <ContentBox>
          <View style={styles.bottomViewText}>
            <View>
              <Text style={styles.bottomTitleText}>나</Text>
            </View>
            <View>
              <Text style={styles.bottomAmountText}>요청금액 20000원</Text>
            </View>
          </View>
        </ContentBox>
        {selectedData.map((data) => {
          return (
            <View style={styles.bottomView} key={data.id}>
              <ContentBox widthPercentage={0.75}>
                <View style={styles.bottomViewText}>
                  <View>
                    <Text style={styles.bottomTitleText}>{data.id}</Text>
                  </View>
                  <View>
                    <Text style={styles.bottomAmountText}>
                      요청금액 20000원
                    </Text>
                  </View>
                </View>
              </ContentBox>
              <View style={styles.bottomViewImage}>
                <Ionicons name="remove-circle-outline" size={40} color="red" />
              </View>
            </View>
          );
        })}
        <View style={styles.buttonView}>
          <Botton title="더치페이 요청" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Botton: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.onPress}
      activeOpacity={0.9}
    >
      <Text style={styles.button_text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    // paddingTop: 60,
    // paddingLeft: 20,
    // paddingRight: 20,
  },
  amountText: {
    fontWeight: '600',
    fontSize: 25,
  },
  middleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  currentMemberText: {
    fontSize: 25,
    fontWeight: '600',
  },
  remainingAmountText: {
    fontSize: 20,
    fontWeight: '500',
  },
  bottomView: {
    flexDirection: 'row',
    // height: Dimensions.get('screen').height * 0.1,
  },
  bottomViewText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 8,
  },
  bottomViewImage: {},
  bottomTitleText: {
    fontSize: 18,
    fontWeight: '500',
  },
  bottomAmountText: {
    fontSize: 13,
  },
  button: {
    height: 45,
    width: Dimensions.get('screen').width * 0.7,
    backgroundColor: '#7777F3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button_text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonView: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default DutchPayRequestScreen;
