import React, { useState, useRef, useMemo } from 'react';
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
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';

interface ButtonProps {
  title: string;
  onPress?: () => void;
}

// type SheetRefType = {
//   snapTo: (index: number) => void; // 예를 들어, snapTo 메서드가 숫자를 받는다면
// };

interface DummyProps {
  id: number;
  name: string;
  email: string;
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

const DutchPayRequestScreen: React.FC = () => {
  const [selectedData, setSelectedData] = useState<DummyProps[]>([]);
  const [isActive, setIsActive] = useState<Record<number, boolean>>({});
  const bottomSheetModalRef: React.RefObject<any> = useRef(null);
  const snapPoints = useMemo(() => ['50%'], []);

  function search(name: string) {
    console.log(name);
  }
  function handlePress(dummy: DummyProps) {
    setIsActive({ ...isActive, [dummy.id]: true });
    setSelectedData([...selectedData, dummy]);
  }
  function handleDelete(data: DummyProps) {
    setIsActive({ ...isActive, [data.id]: false });
    const updatedSelectedData = selectedData.filter((item) => item !== data);
    setSelectedData(updatedSelectedData);
  }
  return (
    <BottomSheetModalProvider>
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
                    if (!isActive[dummy.id]) {
                      handlePress(dummy);
                    }
                  }}
                  style={{
                    pointerEvents: isActive[dummy.id] ? 'none' : 'auto',
                  }}
                >
                  <FriendListItem
                    friend={dummy}
                    state={isActive[dummy.id] ? 'gray' : 'black'}
                  />
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
          <MyRequestAccount />
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
                <TouchableOpacity
                  style={styles.bottomViewImage}
                  onPress={() => {
                    handleDelete(data);
                  }}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={40}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={styles.buttonView}>
            <Botton
              title="더치페이 요청"
              onPress={() => {
                if (bottomSheetModalRef.current) {
                  bottomSheetModalRef.current.present();
                }
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <View>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
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

const MyRequestAccount: React.FC = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
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
  bottomViewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 20,
  },
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
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default DutchPayRequestScreen;
