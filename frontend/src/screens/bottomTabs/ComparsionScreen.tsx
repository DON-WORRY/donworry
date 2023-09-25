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
import {
  friendListInquiry,
  friendTotalSpend,
} from '../../utils/FriendFunctions';
import { consumptionCategoryTotal } from '../../utils/ConsumptionFunctions';

const nowDate = new Date();
const nowMonth = nowDate.getMonth() + 1;
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

type Friend = {
  friendId: number;
  friendName: string;
  friendEmail: string;
};

const ComparisonScreen: React.FC<ComparisonScreenProps> = ({ route }) => {
  // const ComparisonScreen: React.FC = () => {
  const friendPk = route.params?.friendPk ?? -1;
  const [friendList, setFriendList] = useState<Friend[]>([]);
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
  useEffect(() => {
    // 가장 처음은 friend data를 업데이트하자
    // 내 데이터도 업데이트 해야한다.
    async function fetchFriends() {
      const newFriends: Friend[] = await friendListInquiry()
        .then((r) => {
          console.log(r.data.friendResponseList);
          return r.data.friendResponseList;
        })
        .catch((e) => {
          console.error('-1-1-1-1', e);
        });
      await setFriendList(newFriends);
      const tmpMyData: CategoryAmountList = await consumptionCategoryTotal(
        nowMonth
      )
        .then((r) => {
          return r.data.categoryAmountList;
        })
        .catch((e) => console.error('0000', e));
      await setMyData(tmpMyData);
      console.log('tmpMyData');
      console.log(tmpMyData);
    }

    async function allUpdate() {
      await fetchFriends();
      await fetchComparisonData();
      // farams로 못 불러왔을 때
      // 바로 비교 페이지로 들어갔을 때
    }

    async function fetchComparisonData() {
      if (Number(friendPk) === -1) {
        // 친구가 있을 때
        if (friendList.length > 0) {
          // 첫 번째 친구 Id를 넣자
          console.log('친구 있는 상태 바로 비교로 들어온 상황');
          const tmpFriendId = await friendList[0].friendId;
          await setNowFriendId(tmpFriendId);

          const nowFriend = await friendTotalSpend({
            id: tmpFriendId,
            month: nowMonth,
          })
            .then((r) => {
              console.log('-================');
              console.log(r);
              return r.data.categoryAmountList;
            })
            .catch((e) => {
              console.error('111', e);
            });
          await setFriendData(nowFriend);
          const newData = await {
            totalData: [
              {
                categoryName: friendData[0].category,
                myValue: myData[0].amount,
                friendsValue: friendData[0].amount,
              },
              {
                categoryName: friendData[1].category,
                myValue: myData[1].amount,
                friendsValue: friendData[1].amount,
              },
              {
                categoryName: friendData[2].category,
                myValue: myData[2].amount,
                friendsValue: friendData[2].amount,
              },
              {
                categoryName: friendData[3].category,
                myValue: myData[3].amount,
                friendsValue: friendData[3].amount,
              },
              {
                categoryName: friendData[4].category,
                myValue: myData[4].amount,
                friendsValue: friendData[4].amount,
              },
              {
                categoryName: friendData[5].category,
                myValue: myData[5].amount,
                friendsValue: friendData[5].amount,
              },
            ],
          };
          await setTotalData(newData);
          // 친구가 없을 때
        } else {
          const newData = await {
            totalData: [
              {
                categoryName: myData[0].category,
                myValue: myData[0].amount,
                friendsValue: 0,
              },
              {
                categoryName: myData[1].category,
                myValue: myData[1].amount,
                friendsValue: 0,
              },
              {
                categoryName: myData[2].category,
                myValue: myData[2].amount,
                friendsValue: 0,
              },
              {
                categoryName: friendData[3].category,
                myValue: myData[3].amount,
                friendsValue: 0,
              },
              {
                categoryName: myData[4].category,
                myValue: myData[4].amount,
                friendsValue: 0,
              },
              {
                categoryName: myData[5].category,
                myValue: myData[5].amount,
                friendsValue: 0,
              },
            ],
          };
          await setTotalData(newData);
        }
      } else if (Number(friendPk) !== -1) {
        // 파람스를 통해서 들어왔을 때
        // friend데이터를 업데이트
        const nowFriend = await friendTotalSpend({
          id: Number(friendPk),
          month: nowMonth,
        })
          .then((r) => {
            console.log(r);
            return r.data.categoryAmountList;
          })
          .catch((e) => {
            console.error('222', e);
          });
        await setFriendData(nowFriend);
        const newData = await {
          totalData: [
            {
              categoryName: friendData[0].category,
              myValue: myData[0].amount,
              friendsValue: friendData[0].amount,
            },
            {
              categoryName: friendData[1].category,
              myValue: myData[1].amount,
              friendsValue: friendData[1].amount,
            },
            {
              categoryName: friendData[2].category,
              myValue: myData[2].amount,
              friendsValue: friendData[2].amount,
            },
            {
              categoryName: friendData[3].category,
              myValue: myData[3].amount,
              friendsValue: friendData[3].amount,
            },
            {
              categoryName: friendData[4].category,
              myValue: myData[4].amount,
              friendsValue: friendData[4].amount,
            },
            {
              categoryName: friendData[5].category,
              myValue: myData[5].amount,
              friendsValue: friendData[5].amount,
            },
          ],
        };
        console.log(friendData);
        console.log(myData);
        console.log(totalData);
        await setTotalData(newData);
      }
      // 내 데이터가 나왔으니까
    }
    allUpdate();
  }, []);
  return (
    <View style={styles.container}>
      <ComponentsHeader />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        alwaysBounceHorizontal={true}
      >
        <ComparisonHeader />
        <ComparisonChart totalData={totalData} />
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
