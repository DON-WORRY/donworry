import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import ComponentsHeader from '../../components/ComponentsHeader';
import ComparisonHeader from '../../components/comparisons/ComparisonHeader';
import ComparisonChart from '../../components/comparisons/ComparisonChart';
import ComparisonBar from '../../components/comparisons/ComparisonBar';

// 타입 정의
type RootStackParamList = {
  ComparisonScreen: {
    friendPk: string; // 예: 친구의 pk 값을 전달받기 위한 타입
    // 필요한 다른 파라미터들도 여기에 추가
  };
};

type CategoryAmountList = CategoryAmount[];

type CategoryAmount = {
  amount: number;
  category: string;
};

type TotalDataPropsType = {
  categoryName: string;
  myValue: number;
  friendsValue: number;
};

type TotalDataType = {
  totalData: TotalDataPropsType[];
};

type ComparisonScreenProps = {
  route: RouteProp<RootStackParamList, 'ComparisonScreen'>;
};

const ComparisonScreen: React.FC<ComparisonScreenProps> = ({ route }) => {
  // const ComparisonScreen: React.FC = () => {
  const friendPk = route.params?.friendPk ?? -1;
  const [myData, setMyData] = useState<CategoryAmountList>([]);
  const [friendData, setFriendData] = useState<CategoryAmountList>([]);
  const [totalData, setTotalData] = useState<TotalDataType>({
    totalData: [
      {
        categoryName: '여가',
        myValue: 0,
        friendsValue: 0,
      },
      {
        categoryName: '쇼핑',
        myValue: 0,
        friendsValue: 0,
      },
      {
        categoryName: '교통',
        myValue: 0,
        friendsValue: 0,
      },
      {
        categoryName: '식비',
        myValue: 0,
        friendsValue: 0,
      },
      {
        categoryName: '생활',
        myValue: 0,
        friendsValue: 0,
      },
      {
        categoryName: '기타',
        myValue: 0,
        friendsValue: 0,
      },
    ],
  });
  const [nowFriendId, setNowFriendId] = useState(-1);

  // // 소비 불러오기
  // useEffect(() => {
  //   async function fetch() {
  //     // 내 소비 불러오기
  //     // 친구 리스트 불러오기
  //   }
  // }, []);
  // useEffect(() => {
  //   if (nowFriendId !== -1) {
  //   }
  // }, [nowFriendId !== -1]);

  return (
    <View style={styles.container}>
      <ComponentsHeader />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        alwaysBounceHorizontal={true}
      >
        <ComparisonHeader />
        <ComparisonChart />
        {/* {modeKey.map((keyName) => {
          return (
            <View key={keyName}>
              <ComparisonBar
                categoryName={categoryName[keyName]}
                myValue={myData[keyName]}
                friendsValue={friendData[keyName]}
              />
            </View>
          );
        })} */}
        <FlatList
          disableScrollViewPanResponder={true}
          scrollEnabled={false}
          keyExtractor={(c) => c.categoryName}
          data={totalData.totalData}
          // renderItem 정보를 추가해주어야 합니다. 예를 들면:
          renderItem={({ item }) => (
            <ComparisonBar
              categoryName={item.categoryName}
              myValue={item.myValue}
              friendsValue={item.friendsValue}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

// const screenWidth = Dimensions.get('screen').width;
// const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRignt: 20,
    paddingBottom: 80,
  },
  scrollView: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default ComparisonScreen;
