import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button } from '../../components/logins/Login';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { consumptionDutchPayInquiry } from '../../utils/ConsumptionFunctions';
import { Tab, TabView } from '@rneui/themed';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';
import { getData } from '../../utils/ConsumptionFunctions';
import { consumptionDutchPayPriceSend } from '../../utils/ConsumptionFunctions';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
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
  const snapPoints = useMemo(() => ['31%'], []);
  const bottomSheetModalRef: React.RefObject<any> = useRef(null);
  const navigation = useNavigation<ScreenProps['navigation']>();
  const [selectedMemberId, setSelectedMemberId] = useState(0);
  const [selectedMemberName, setSelectedMemberName] = useState('');
  const [selectedMemberPrice, setSelectedMemberPrice] = useState(0);
  // 송금을 클릭했어요?
  const [isClickedSend, setIsClickedSend] = useState(false);
  const [nowEasyPass, setNowEasyPass] = useState('');
  const [easyPass, setEasyPass] = useState('');
  const [passwordNumbers, setPasswordNumbers] = useState<string[]>([]);
  async function shuffle(array: string[]): Promise<string[]> {
    await array.sort(() => Math.random() - 0.5);
    await setPasswordNumbers(array);
    return array;
  }
  const [completeRound, setCompleteRound] = useState({
    a: false,
    b: false,
    c: false,
    d: false,
    e: false,
    f: false,
  });
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  useEffect(() => {
    shuffle(numbers);
  }, []);

  useEffect(() => {
    const updateState = async () => {
      if (easyPass.length === 6) {
        await setCompleteRound({
          a: false,
          b: false,
          c: false,
          d: false,
          e: false,
          f: false,
        });
        handlePriceSend(easyPass)
      }
    };
    updateState();
  }, [easyPass]);
  

  async function clickButton(str: string) {
    // setCompleteRound((prev) => prev.nowIndex = true)
    if (str == 'delete') {
      // console.log('delete');
      if (easyPass === '') {
        return Alert.alert('삭제 오류', '비밀번호를 입력해주세요');
      }
      const lenPass = easyPass.length;
      const tmpPass = easyPass.slice(0, lenPass - 1);
      if (lenPass == 1) {
        setCompleteRound({
          a: false,
          b: false,
          c: false,
          d: false,
          e: false,
          f: false,
        });
      } else if (lenPass == 2) {
        setCompleteRound({
          a: true,
          b: false,
          c: false,
          d: false,
          e: false,
          f: false,
        });
      } else if (lenPass == 3) {
        setCompleteRound({
          a: true,
          b: true,
          c: false,
          d: false,
          e: false,
          f: false,
        });
      } else if (lenPass == 4) {
        setCompleteRound({
          a: true,
          b: true,
          c: true,
          d: false,
          e: false,
          f: false,
        });
      } else if (lenPass == 5) {
        setCompleteRound({
          a: true,
          b: true,
          c: true,
          d: true,
          e: false,
          f: false,
        });
      } else if (lenPass == 6) {
        setCompleteRound({
          a: true,
          b: true,
          c: true,
          d: true,
          e: true,
          f: false,
        });
      }
      await setEasyPass(tmpPass);
      return;
    }

    if (str == 'all') {
      await setEasyPass('');
      setCompleteRound({
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
      });
      return;
    }
    const nowIndex = easyPass.length + 1;
    if (nowIndex == 1) {
      setCompleteRound({
        a: true,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
      });
    } else if (nowIndex == 2) {
      setCompleteRound({
        a: true,
        b: true,
        c: false,
        d: false,
        e: false,
        f: false,
      });
    } else if (nowIndex == 3) {
      setCompleteRound({
        a: true,
        b: true,
        c: true,
        d: false,
        e: false,
        f: false,
      });
    } else if (nowIndex == 4) {
      setCompleteRound({
        a: true,
        b: true,
        c: true,
        d: true,
        e: false,
        f: false,
      });
    } else if (nowIndex == 5) {
      setCompleteRound({
        a: true,
        b: true,
        c: true,
        d: true,
        e: true,
        f: false,
      });
    } else if (nowIndex == 6) {
      setCompleteRound({
        a: true,
        b: true,
        c: true,
        d: true,
        e: true,
        f: true,
      });
      // console.log(easyPass.length);
      // handlePriceSend()
    }
    const tmpPass = (await easyPass) + str;
    await setEasyPass(tmpPass);
    // await shuffle(numbers);
    if (tmpPass.length === 6) {
      await setNowEasyPass(tmpPass);
      await handlePriceSend(tmpPass);
    }
  }

  async function clickSendButton() {
    authenticateBiometric();
    setIsClickedSend(true);
  }

  async function authenticateBiometric() {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: '지문을 스캔해주세요.', // 사용자에게 보여질 메시지
      });

      if (result.success) {
        alert('지문 인증 성공!');
        // 생체 인증 성공했으니깐
        await handlePriceSendByBiometric();
        await setIsClickedSend(false);
      } else {
        alert('지문 인증 실패 또는 취소됨.');
      }
    } catch (error: any) {
      alert('지문 인증 오류: ' + error.message);
    }
  }

  async function handlePriceSendByBiometric() {
    // 생체 인증
    const data = await {
      detailDutchpayId: selectedMemberId,
      sendPrice: selectedMemberPrice,
      simplePassword: '0',
      finger: true,
    };
    await sendDutchpayData(data);
  }

  async function handlePriceSend(password: string) {
    // 간편인증 하고 밑으로 들어가서 다음 함수 실행
    const data = await {
      detailDutchpayId: selectedMemberId,
      sendPrice: selectedMemberPrice,
      simplePassword: password,
      finger: false,
    };
    await sendDutchpayData(data);
  }

  async function sendDutchpayData(data: {
    detailDutchpayId: number;
    sendPrice: number;
    simplePassword: string;
    finger: boolean;
  }) {
    try {
      const response = await consumptionDutchPayPriceSend(data);
      if (response) {
        navigation.navigate('SendingCompleteScreen', { source: 2 });
      } else {
        console.error('API response does not contain data.');
      }
    } catch (error) {
      // 비밀 번호가 틀렸을 경우
      setIsClickedSend(false);
      console.error('An error occurred:', error);
      return Alert.alert('전송 실패');
    }
  }

  return (
    <ScrollView>
      {isClickedSend ? (
        <View style={simpleStyles.container}>
          <View style={simpleStyles.topBox}>
            <Text style={simpleStyles.topText}>비밀번호 입력</Text>
            <View style={simpleStyles.middleBox}>
              <View
                style={[
                  simpleStyles.roundBox,
                  completeRound.a ? simpleStyles.successBox : null,
                ]}
              ></View>
              <View
                style={[
                  simpleStyles.roundBox,
                  completeRound.b ? simpleStyles.successBox : null,
                ]}
              ></View>
              <View
                style={[
                  simpleStyles.roundBox,
                  completeRound.c ? simpleStyles.successBox : null,
                ]}
              ></View>
              <View
                style={[
                  simpleStyles.roundBox,
                  completeRound.d ? simpleStyles.successBox : null,
                ]}
              ></View>
              <View
                style={[
                  simpleStyles.roundBox,
                  completeRound.e ? simpleStyles.successBox : null,
                ]}
              ></View>
              <View
                style={[
                  simpleStyles.roundBox,
                  completeRound.f ? simpleStyles.successBox : null,
                ]}
              ></View>
            </View>
          </View>

          <View style={simpleStyles.bottomBox}>
            <View style={simpleStyles.rowBox}>
              <TouchableOpacity
                style={simpleStyles.keyBox}
                onPress={() => {
                  clickButton(passwordNumbers[0]);
                }}
              >
                <View>
                  <Text style={simpleStyles.keyText}>{passwordNumbers[0]}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={simpleStyles.keyBox}
                onPress={() => {
                  clickButton(passwordNumbers[1]);
                }}
              >
                <View>
                  <Text style={simpleStyles.keyText}>{passwordNumbers[1]}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={simpleStyles.keyBox}
                onPress={() => {
                  clickButton(passwordNumbers[2]);
                }}
              >
                <View>
                  <Text style={simpleStyles.keyText}>{passwordNumbers[2]}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={simpleStyles.rowBox}>
              <TouchableOpacity
                style={simpleStyles.keyBox}
                onPress={() => {
                  clickButton(passwordNumbers[3]);
                }}
              >
                <View>
                  <Text style={simpleStyles.keyText}>{passwordNumbers[3]}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={simpleStyles.keyBox}
                onPress={() => {
                  clickButton(passwordNumbers[4]);
                }}
              >
                <View>
                  <Text style={simpleStyles.keyText}>{passwordNumbers[4]}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={simpleStyles.keyBox}
                onPress={() => {
                  clickButton(passwordNumbers[5]);
                }}
              >
                <View>
                  <Text style={simpleStyles.keyText}>{passwordNumbers[5]}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={simpleStyles.rowBox}>
              <TouchableOpacity
                style={simpleStyles.keyBox}
                onPress={() => {
                  clickButton(passwordNumbers[6]);
                }}
              >
                <View>
                  <Text style={simpleStyles.keyText}>{passwordNumbers[6]}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={simpleStyles.keyBox}
                onPress={() => {
                  clickButton(passwordNumbers[7]);
                }}
              >
                <View>
                  <Text style={simpleStyles.keyText}>{passwordNumbers[7]}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={simpleStyles.keyBox}
                onPress={() => {
                  clickButton(passwordNumbers[8]);
                }}
              >
                <View>
                  <Text style={simpleStyles.keyText}>{passwordNumbers[8]}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={simpleStyles.rowBox}>
              <TouchableOpacity
                style={simpleStyles.keyBox}
                onPress={() => {
                  clickButton('all');
                }}
              >
                <View>
                  <Text style={simpleStyles.allRemove}>전체 삭제</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={simpleStyles.keyBox}
                onPress={() => {
                  clickButton(passwordNumbers[9]);
                }}
              >
                <View>
                  <Text style={simpleStyles.keyText}>{passwordNumbers[9]}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={simpleStyles.keyBox}
                onPress={() => {
                  clickButton('delete');
                }}
              >
                <View>
                  <MaterialIcons name="backspace" size={30} color={'white'} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <>
          {props.sendDutchpayTotalList.length > 0 ? (
            props.sendDutchpayTotalList.map((sendDutchpayTotal, index) => (
              <View
                style={styles.tabContainer}
                key={sendDutchpayTotal.dutchpayId}
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
                    보낸인원{' '}
                    {
                      sendDutchpayTotal.dutchpayPersonList.filter(
                        (dutchpayPerson) =>
                          dutchpayPerson.dutchpayStatus === 'COMPLETE'
                      ).length
                    }
                    /{sendDutchpayTotal.reqMemberSize}
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
                    <View style={styles.modalNameView}>
                      <Text style={styles.modalNameText}>
                        {selectedMemberName}에게
                      </Text>
                    </View>
                    <View style={styles.modalPriceView}>
                      <Text style={styles.modalPriceText}>
                        {selectedMemberPrice}원
                      </Text>
                    </View>
                    <View style={styles.modalSeqView}>
                      <Text style={styles.modalSeqText}>을 보낼까요?</Text>
                    </View>
                    <Button
                      title="송금"
                      onPress={() => {
                        clickSendButton();
                      }}
                      widthPercentage={0.9}
                    />
                  </View>
                </BottomSheetModal>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>요청 받은 더치페이가 없습니다</Text>
          )}
        </>
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
                보낸인원{' '}
                {
                  receiveDutchpayTotal.dutchpayPersonList.filter(
                    (dutchpayPerson) =>
                      dutchpayPerson.dutchpayStatus === 'COMPLETE'
                  ).length
                }
                /{receiveDutchpayTotal.reqMemberSize}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <View>
          <Text style={styles.emptyText}>요청한 더치페이가 없습니다.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const DutchpayFriendList: React.FC<DutchpayFriendList> = (props) => {
  let completeCount = 0;
  if (props.dutchpayPerson.dutchpayStatus === 'COMPLETE') {
    completeCount += 1;
  }
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
  },
  modalHeaderView: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalNameView: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
  },
  modalNameText: {
    fontSize: 20,
  },
  modalPriceView: {},
  modalPriceText: {
    fontSize: 25,
    fontWeight: '600',
  },
  modalSeqView: {
    alignSelf: 'flex-end',
    paddingRight: 10,
    paddingBottom: 18,
  },
  modalSeqText: {
    fontSize: 20,
  },
  emptyText: {
    color: 'lightgray',
    fontSize: 20,
    marginTop: 20,
  },
});

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const simpleStyles = StyleSheet.create({
  container: {
    height: screenHeight * 0.7,
    width: screenWidth - 40,
    // backgroundColor: "blue"
  },
  topBox: {
    height: screenHeight * 0.4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBox: {
    flexDirection: 'column',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    width: screenWidth - 40,
    height: screenHeight,
  },
  lineBox: {
    width: screenWidth - 40,
  },
  keyBox: {
    backgroundColor: '#7777F3',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBox: {
    flexDirection: 'row',
    flex: 1,
    width: screenWidth - 40,
    // height: 60,
  },
  columnBox: {
    width: screenWidth - 40,
    height: screenHeight,
  },
  keyText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  allRemove: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  topText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#7777F3',
  },
  roundBox: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'gray',
    marginLeft: 5,
    marginRight: 5,
  },
  middleBox: {
    paddingTop: 30,
    height: 60,
    flexDirection: 'row',
  },
  successBox: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#7777F3',
    marginLeft: 5,
    marginRight: 5,
  },
});

export default DutchpayTabMenu;
