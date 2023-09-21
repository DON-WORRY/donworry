import React, { useState, useRef, useMemo, useEffect } from 'react';
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
import NumberKeyBoard from '../../components/dutchpays/NumberKeyBoard';
import { Button } from '../../components/logins/Login';
import { AntDesign } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

interface MemberProps {
  id: number;
  name: string;
  email: string;
  money?: string;
}

interface Nq1ButtonProps {
  title: string;
  onPress: () => void;
  widthPercentage?: number;
}

interface MyRequestProps {
  myRequestAccount: string;
  onPress: () => void;
}

type DutchPayRequestScreenProps = {
  route: RouteProp<
    { DutchPayRequest: { conId: number; conName: string; conMoney: number } },
    'DutchPayRequest'
  >;
};

const dummyData = [
  {
    id: 1,
    name: 'test1',
    email: 'test1@naver.com',
  },
  {
    id: 2,
    name: 'test2',
    email: 'test2@naver.com',
  },
  {
    id: 3,
    name: 'test3',
    email: 'test3@naver.com',
  },
  {
    id: 4,
    name: 'test4',
    email: 'test4@naver.com',
  },
  {
    id: 5,
    name: 'test5',
    email: 'test5@naver.com',
  },
];

const DutchPayRequestScreen: React.FC<DutchPayRequestScreenProps> = ({
  route,
}) => {
  const [selectedMemberList, setSelectedMemberList] = useState<MemberProps[]>(
    []
  );
  const [selectedMember, setSelectedMember] = useState<MemberProps | undefined>(
    undefined
  );
  const [isActive, setIsActive] = useState<Record<number, boolean>>({});
  const bottomSheetModalRef: React.RefObject<any> = useRef(null);
  const snapPoints = useMemo(() => ['58%'], []);

  const consumptionData = route.params;
  const formattedMoney = new Intl.NumberFormat('en-US').format(
    consumptionData.conMoney
  );
  const [inputValue, setInputValue] = useState('');
  const [currentMember, setCurrentMember] = useState(1);
  const [remainingAmount, setRemainingAmount] = useState(
    consumptionData.conMoney
  );
  const [myRequestAccount, setMyRequestAccount] = useState('');
  const [disabled, setDisabled] = useState(true);
  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  useEffect(() => {
    if (selectedMemberList.length === 0 && myRequestAccount) {
      const myRequestAccountAsNumber = parseInt(myRequestAccount, 10);
      setRemainingAmount((prevAmount) => prevAmount + myRequestAccountAsNumber);
      setMyRequestAccount('');
    }
  }, [selectedMemberList]);

  useEffect(() => {
    // 0원인지 확인하기
    if (remainingAmount == 0) {
      const hasEmptyMoneyInSelectedMembers = selectedMemberList.some(
        (member) => member.money === ''
      );
      if (!hasEmptyMoneyInSelectedMembers) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(true);
    }
  }, [remainingAmount, selectedMemberList]);

  function search(name: string) {
    console.log(name);
  }
  // 친구 클릭 시
  function handlePress(dummy: MemberProps) {
    setSelectedMember(dummy);
    bottomSheetModalRef.current.present(); // 돈 입력 모달 표시
  }
  // 돈 입력 후 추가 클릭 시
  function handleAdd(N1: boolean) {
    // 값 범위안에 들어와야 함!
    const inputValueByNumber = parseInt(inputValue, 10);
    if (selectedMember) {
      if (remainingAmount < inputValueByNumber || inputValueByNumber < 1) {
        alert('다시 입력해주세요');
        return;
      }
    } else {
      const myRequestAccountAsNumber = myRequestAccount
        ? parseInt(myRequestAccount, 10)
        : 0;
      const updateRemainingAmount = remainingAmount + myRequestAccountAsNumber;
      if (
        updateRemainingAmount < inputValueByNumber ||
        inputValueByNumber < 1
      ) {
        alert('다시 입력해주세요');
        return;
      }
    }
    const updateInputValue = N1 ? inputValue : '';
    if (selectedMember) {
      setIsActive({ ...isActive, [selectedMember.id]: true });
      setSelectedMemberList([
        ...selectedMemberList,
        { ...selectedMember, money: updateInputValue },
      ]);
      // 현재인원 최신화
      setCurrentMember((prevMember) => prevMember + 1);
      // 나인 경우
    } else {
      if (myRequestAccount) {
        const myRequestAccountAsNumber = parseInt(myRequestAccount, 10);
        setRemainingAmount(
          (prevAmount) => prevAmount + myRequestAccountAsNumber
        );
      }
      setMyRequestAccount(updateInputValue);
    }
    // 남은금액 최신화
    if (updateInputValue) {
      const inputValueAsNumber = parseInt(updateInputValue, 10);
      setRemainingAmount((prevAmount) => prevAmount - inputValueAsNumber);
    }
    bottomSheetModalRef.current.dismiss();
  }
  function handleDelete(data: MemberProps) {
    setIsActive({ ...isActive, [data.id]: false });
    const amount = selectedMemberList.find((item) => item.id === data.id)
      ?.money;
    const updatedSelectedMemberList = selectedMemberList.filter(
      (item) => item !== data
    );
    setSelectedMemberList(updatedSelectedMemberList);
    // 남은금액 최신화
    if (amount) {
      const inputValueAsNumber = parseInt(amount, 10);
      setRemainingAmount((prevAmount) => prevAmount + inputValueAsNumber);
    }
    // 현재인원 최신화
    setCurrentMember((prevMember) => prevMember - 1);
  }
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <BackHeader screen="Spend" />
        <ScrollView>
          <Text>더치페이</Text>
          <Text style={styles.amountText}>{formattedMoney}원</Text>
          <Text>{consumptionData.conName}</Text>
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
              <Text style={styles.currentMemberText}>
                현재 인원 {currentMember}명
              </Text>
            </View>
            <Text style={styles.remainingAmountText}>
              남은 금액 {remainingAmount}
            </Text>
          </View>
          <MyRequestAccount
            myRequestAccount={myRequestAccount}
            onPress={() => {
              setSelectedMember(undefined);
              bottomSheetModalRef.current.present();
            }}
          />
          {selectedMemberList.map((data) => {
            return (
              <View style={styles.bottomView} key={data.id}>
                <ContentBox widthPercentage={0.75}>
                  <View style={styles.bottomViewText}>
                    <View>
                      <Text style={styles.bottomTitleText}>{data.name}</Text>
                    </View>
                    <View>
                      <Text style={styles.bottomAmountText}>
                        요청금액 {data.money === '' ? '1/N' : data.money}원
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
            <Button
              title="더치페이 요청"
              onPress={() => bottomSheetModalRef.current.present()}
              disabled={disabled}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>요청 금액 입력</Text>
            <TouchableOpacity
              onPress={() => bottomSheetModalRef.current.dismiss()}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <NumberKeyBoard
            onInputChange={handleInputChange}
            selectedMember={selectedMember}
          />
          <View style={styles.buttonBottomView}>
            <Button
              title="추가"
              onPress={() => {
                handleAdd(true);
              }}
              widthPercentage={0.55}
            />
            <Nq1Button
              title="N/1 추가"
              onPress={() => {
                handleAdd(false);
              }}
            />
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const MyRequestAccount: React.FC<MyRequestProps> = (props) => {
  return (
    <ContentBox>
      <View style={styles.bottomViewText}>
        <View>
          <Text style={styles.bottomTitleText}>나</Text>
        </View>
        <View style={styles.bottomLeftView}>
          <View>
            <Text style={styles.bottomAmountText}>
              요청금액{' '}
              {props.myRequestAccount === '' ? '1/N' : props.myRequestAccount}원
            </Text>
          </View>
          <View style={styles.bottomPencilView}>
            <TouchableOpacity onPress={props.onPress}>
              <FontAwesome name="pencil" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ContentBox>
  );
};

const Nq1Button: React.FC<Nq1ButtonProps> = (props) => {
  return (
    <TouchableOpacity
      style={styles.n1button}
      onPress={props.onPress}
      activeOpacity={0.9}
    >
      <Text style={styles.n1buttonText}>{props.title}</Text>
    </TouchableOpacity>
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
  bottomLeftView: {
    flexDirection: 'row',
  },
  bottomAmountText: {
    fontSize: 13,
  },
  bottomPencilView: {
    marginLeft: 15,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerView: {
    width: Dimensions.get('screen').width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 15,
    fontWeight: '700',
  },
  buttonBottomView: {
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  n1button: {
    width: Dimensions.get('screen').width * 0.22,
    height: 45,
    backgroundColor: '#FFCE84',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 8,
  },
  n1buttonText: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DutchPayRequestScreen;
export { MemberProps };
