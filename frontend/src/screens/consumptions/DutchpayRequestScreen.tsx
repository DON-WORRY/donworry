import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import BackHeader from '../../components/BackHeader';
import ContentBox from '../../components/ContentBox';
// import FriendSearch from '../../components/friends/children/FriendSearch';
// import FriendListItem from '../../components/friends/children/FriendListItem';
// import FriendList from '../../components/friends/FriendList';
import { Ionicons } from '@expo/vector-icons';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import NumberKeyBoard from '../../components/dutchpays/DutchpayNumberKeyBoard';
import { Button } from '../../components/logins/Login';
import { AntDesign } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigations/RootNavigator/Stack';
import { useNavigation } from '@react-navigation/native';
import { consumptionDutchPayRequest } from '../../utils/ConsumptionFunctions';
import { DutchPayRequestData } from '../../utils/ConsumptionFunctions';
import FriendListForDutchpay from '../../components/dutchpays/DutchpayFriendListForDutchpay';
import { friendListInquiry } from '../../utils/FriendFunctions';
import FriendListItemForDutchpay from '../../components/dutchpays/children/DutchpayFiendListItemForDutchpay';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    pop: () => void;
    replace: (screen: string, params?: any) => void;
  };
}

interface MemberProps {
  memberId: number;
  memberName: string;
  memberEmail: string;
  price?: string;
}

interface FriendProps {
  friendId: number;
  friendName: string;
  friendEmail: string;
  price?: string;
}

interface Nq1ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  widthPercentage?: number;
}

interface MyRequestProps {
  myRequestAccount: string;
  onPress: () => void;
}

type DutchpayRequestScreenProps = {
  route: RouteProp<RootStackParamList, 'DutchpayRequest'>;
};

function formattedPrice(inputPrice: number | string) {
  const price =
    typeof inputPrice === 'string' ? parseFloat(inputPrice) : inputPrice;
  const formatted = new Intl.NumberFormat('en-US').format(price);
  return formatted;
}

const DutchpayRequestScreen: React.FC<DutchpayRequestScreenProps> = ({
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
  const [inputValue, setInputValue] = useState('');
  const [currentMember, setCurrentMember] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(consumptionData.price);
  const [myRequestAccount, setMyRequestAccount] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [disabledByN1, setDisabledByN1] = useState(true);
  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };
  const navigation = useNavigation<ScreenProps['navigation']>();
  const [friends, setFriends] = useState<FriendProps[]>([]);
  const [filteredFriends, setFilteredFriends] = useState<FriendProps[]>([]);
  const [searchName, setSearchName] = useState('');

  // 친구목록 불러오기
  useEffect(() => {
    async function fetch() {
      const data = await friendListInquiry()
        .then((r) => {
          // console.log(r)
          return r.data.friendResponseList;
        })
        .catch((e) => {
          throw e;
        });
      // console.log('freinds', data);
      await setFriends(data);
      await setFilteredFriends(data);
      // console.log(data);
      return;
    }
    fetch();
  }, []);

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
        (member) => member.price === ''
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

  useEffect(() => {
    // 다 1/N인지 확인하기
    const hasEmptyMoneyInSelectedMembers = selectedMemberList.every(
      (member) => member.price === ''
    );
    if (
      selectedMemberList.length != 0 &&
      hasEmptyMoneyInSelectedMembers &&
      myRequestAccount === ''
    ) {
      setDisabledByN1(false);
    } else {
      setDisabledByN1(true);
    }
  }, [remainingAmount, selectedMemberList]);

  // 친구 클릭 시
  function handlePress(data: FriendProps) {
    const transformedData: MemberProps = {
      memberId: data.friendId,
      memberName: data.friendName,
      memberEmail: data.friendEmail,
    };
    setSelectedMember(transformedData);
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
      setIsActive({ ...isActive, [selectedMember.memberId]: true });
      setSelectedMemberList([
        ...selectedMemberList,
        { ...selectedMember, price: updateInputValue },
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
    setIsActive({ ...isActive, [data.memberId]: false });
    const amount = selectedMemberList.find(
      (item) => item.memberId === data.memberId
    )?.price;
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
  function handleDutchpayRequest() {
    async function createDutchpayData() {
      try {
        const response = await consumptionDutchPayRequest(data);
        if (response) {
          console.log(response);
          navigation.pop();
          navigation.replace('StackNavigation', { screen: 'DutchpayState' });
        } else {
          console.error('API response does not contain data.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    const reqAmountList = selectedMemberList.map(({ memberEmail, price }) => ({
      memberEmail,
      price: parseFloat(price || '0'),
    }));
    const data: DutchPayRequestData = {
      consumptionId: consumptionData.id,
      reqAmountList: reqAmountList,
    };
    console.log(data);
    createDutchpayData();
  }

  function handleDutchpayRequestByN1() {
    async function createDutchpayData() {
      try {
        const response = await consumptionDutchPayRequest(data);
        if (response) {
          console.log(response);
          navigation.pop();
          navigation.replace('StackNavigation', { screen: 'DutchpayState' });
        } else {
          console.error('API response does not contain data.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    const totalMemberLength = selectedMemberList.length + 1;
    const reqAmountList = selectedMemberList.map(({ memberEmail }) => ({
      memberEmail,
      price: Math.ceil(consumptionData.price / totalMemberLength),
    }));
    const data: DutchPayRequestData = {
      consumptionId: consumptionData.id,
      reqAmountList: reqAmountList,
    };
    console.log(data);
    createDutchpayData();
  }

  // 친구 검색
  function handleSearchTextChange(text: string) {
    setSearchName(text);

    if (text === '') {
      setFilteredFriends([]);
    } else {
      const filtered = friends.filter((friend) =>
        friend.friendName.includes(text)
      );
      setFilteredFriends(filtered);
    }
  }

  function renderFriendList(friend: FriendProps) {
    return (
      <View key={friend.friendId} style={{ overflow: 'scroll' }}>
        <TouchableOpacity
          onPress={() => {
            if (!isActive[friend.friendId]) {
              handlePress(friend);
            }
          }}
          style={{
            pointerEvents: isActive[friend.friendId] ? 'none' : 'auto',
          }}
        >
          <FriendListItemForDutchpay
            friend={friend}
            state={isActive[friend.friendId] ? 'lightgray' : 'black'}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BackHeader screen="Spend" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContainerView}>
            <Text>더치페이</Text>
            <Text style={styles.amountText}>
              {formattedPrice(consumptionData.price)}원
            </Text>
            <Text style={{ marginBottom: 10 }}>{consumptionData.detail}</Text>
            <MyRequestAccount
              myRequestAccount={myRequestAccount}
              onPress={() => {
                setSelectedMember(undefined);
                bottomSheetModalRef.current.present();
              }}
            />
            <View style={styles.middleView}>
              <View>
                <Text style={styles.currentMemberText}>
                  현재 인원 {currentMember}명
                </Text>
              </View>
              <Text style={styles.remainingAmountText}>
                남은 금액 {formattedPrice(remainingAmount)}
              </Text>
            </View>
            <FriendListForDutchpay>
              <View>
                <TextInput
                  style={styles.searchTextInput}
                  placeholder={'이름으로 친구 찾기'}
                  value={searchName}
                  onChangeText={(text) => handleSearchTextChange(text)}
                />
                <ScrollView>
                  {searchName === '' ? (
                    friends.length === 0 ? (
                      <Text style={styles.searchResultText}>
                        친구가 없습니다
                      </Text>
                    ) : (
                      friends.map(renderFriendList)
                    )
                  ) : filteredFriends.length === 0 ? (
                    <Text style={styles.searchResultText}>
                      검색 결과가 없습니다
                    </Text>
                  ) : (
                    filteredFriends.map(renderFriendList)
                  )}
                </ScrollView>
              </View>
            </FriendListForDutchpay>
            {selectedMemberList.length === 0 ? (
              <Text style={styles.selectFriendsText}>
                친구를 선택하여 주세요.
              </Text>
            ) : (
              selectedMemberList.map((data) => {
                return (
                  <View style={styles.bottomView} key={data.memberId}>
                    <ContentBox widthPercentage={0.75}>
                      <View style={styles.bottomViewText}>
                        <View>
                          <Text style={styles.bottomTitleText}>
                            {data.memberName}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.bottomAmountText}>
                            요청금액{' '}
                            {data.price === ''
                              ? '1/N'
                              : formattedPrice(data.price || 0)}
                            원
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
              })
            )}
            <View style={styles.buttonView}>
              <Button
                title="더치페이 요청"
                onPress={() => {
                  handleDutchpayRequest();
                }}
                disabled={disabled}
                widthPercentage={0.65}
              />
              <Nq1Button
                title="1/N 요청"
                onPress={() => {
                  handleDutchpayRequestByN1();
                }}
                disabled={disabledByN1}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <View style={styles.headerContainer}>
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
    <ContentBox additionalStyle={{ borderColor: '#C4C4F8', borderWidth: 1 }}>
      <View style={styles.bottomViewText}>
        <View>
          <Text style={styles.bottomTitleText}>나</Text>
        </View>
        <View style={styles.bottomLeftView}>
          <View>
            <Text style={styles.bottomAmountText}>
              요청금액{' '}
              {props.myRequestAccount === ''
                ? '1/N'
                : formattedPrice(props.myRequestAccount)}
              원
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
      style={[
        styles.n1button,
        { backgroundColor: props.disabled ? 'gray' : '#FFCE84' },
      ]}
      onPress={props.onPress}
      activeOpacity={0.9}
      disabled={props.disabled}
    >
      <Text style={styles.n1buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 60,
  },
  scrollContainerView: {
    flex: 1,
    overflow: 'scroll',
  },
  amountText: {
    fontWeight: '600',
    fontSize: 25,
  },
  searchTextInput: {
    height: 40,
    width: Dimensions.get('screen').width * 0.45,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontSize: 17,
    paddingLeft: 8,
    marginTop: 10,
    marginBottom: 10,
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
    paddingTop: 10,
  },
  selectFriendsText: {
    fontSize: 17,
    textAlign: 'center',
    color: 'gray',
    padding: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    flex: 1,
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
  searchResultText: {
    fontSize: 17,
    color: 'lightgray',
    marginTop: 15,
  },
});

export default DutchpayRequestScreen;
export { MemberProps, DutchpayRequestScreenProps };
