import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { wireTransfer } from '../utils/AccountFunctions';
import * as LocalAuthentication from 'expo-local-authentication';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

type Props = {
  route?: {
    params?: {
      accountId?: number;
      accountNumber?: string;
      price?: number;
      consumptionCategoryId?: number;
      refresh?: number;
    };
  };
};

const SamplePWCheck: React.FC<Props> = (props) => {
  const navigation = useNavigation<ScreenProps['navigation']>();
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
    authenticateBiometric()
    shuffle(numbers);
    // console.log(numbers)
  }, []);

  useEffect(() => {
    if (easyPass.length === 6) {
      wireTrans(false);
    }
  }, [easyPass]);  

  async function authenticateBiometric() {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: '지문을 스캔해주세요.', // 사용자에게 보여질 메시지
      });

      if (result.success) {
        alert('지문 인증 성공!');
        wireTrans(true)
      } else {
        alert('지문 인증 실패 또는 취소됨.');
      }
    } catch (error: any) {
      alert('지문 인증 오류: ' + error.message);
    }
  }


  const wireTrans = async (success: boolean) => {
    const isErrorWithResponse = (
      error: any
    ): error is { response: { data: { message: string } } } => {
      return (
        error &&
        error.response &&
        error.response.data &&
        typeof error.response.data.message === 'string'
      );
    };

    if (
      props.route?.params?.accountId &&
      props.route?.params?.accountNumber &&
      props.route?.params?.consumptionCategoryId &&
      props.route?.params?.price &&
      easyPass
    ) {
      console.log("ddddd")
      const data = {
        accountId: props.route?.params?.accountId,
        accountNumber: props.route?.params?.accountNumber,
        consumptionCategoryId: props.route?.params?.consumptionCategoryId,
        price: props.route?.params?.price,
        simplePassword: easyPass,
        finger: success
      };
      try {
        await wireTransfer(data);
        navigation.navigate('Asset', { refresh: Date.now() });
      } 
      catch (error) {
        if (isErrorWithResponse(error)) {
          alert(error.response.data.message);
          setEasyPass('')
          setCompleteRound({
            a: false,
            b: false,
            c: false,
            d: false,
            e: false,
            f: false,
          });
        }
      }
    }
  };

  async function clickButton(str: string) {
    if (str == 'delete') {
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
    }
    const tmpPass = (await easyPass) + str;
    await setEasyPass(tmpPass);
    // await shuffle(numbers);
    // console.log(tmpPass);
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.topBox}>
          <Text style={styles.topText}>비밀번호 입력</Text>
          <View style={styles.middleBox}>
            <View
              style={[
                styles.roundBox,
                completeRound.a ? styles.successBox : null,
              ]}
            ></View>
            <View
              style={[
                styles.roundBox,
                completeRound.b ? styles.successBox : null,
              ]}
            ></View>
            <View
              style={[
                styles.roundBox,
                completeRound.c ? styles.successBox : null,
              ]}
            ></View>
            <View
              style={[
                styles.roundBox,
                completeRound.d ? styles.successBox : null,
              ]}
            ></View>
            <View
              style={[
                styles.roundBox,
                completeRound.e ? styles.successBox : null,
              ]}
            ></View>
            <View
              style={[
                styles.roundBox,
                completeRound.f ? styles.successBox : null,
              ]}
            ></View>
          </View>
        </View>

        <View style={styles.bottomBox}>
          <View style={styles.rowBox}>
            <TouchableOpacity
              style={styles.keyBox}
              onPress={() => {
                clickButton(passwordNumbers[0]);
              }}
            >
              <View>
                <Text style={styles.keyText}>{passwordNumbers[0]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyBox}
              onPress={() => {
                clickButton(passwordNumbers[1]);
              }}
            >
              <View>
                <Text style={styles.keyText}>{passwordNumbers[1]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyBox}
              onPress={() => {
                clickButton(passwordNumbers[2]);
              }}
            >
              <View>
                <Text style={styles.keyText}>{passwordNumbers[2]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowBox}>
            <TouchableOpacity
              style={styles.keyBox}
              onPress={() => {
                clickButton(passwordNumbers[3]);
              }}
            >
              <View>
                <Text style={styles.keyText}>{passwordNumbers[3]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyBox}
              onPress={() => {
                clickButton(passwordNumbers[4]);
              }}
            >
              <View>
                <Text style={styles.keyText}>{passwordNumbers[4]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyBox}
              onPress={() => {
                clickButton(passwordNumbers[5]);
              }}
            >
              <View>
                <Text style={styles.keyText}>{passwordNumbers[5]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowBox}>
            <TouchableOpacity
              style={styles.keyBox}
              onPress={() => {
                clickButton(passwordNumbers[6]);
              }}
            >
              <View>
                <Text style={styles.keyText}>{passwordNumbers[6]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyBox}
              onPress={() => {
                clickButton(passwordNumbers[7]);
              }}
            >
              <View>
                <Text style={styles.keyText}>{passwordNumbers[7]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyBox}
              onPress={() => {
                clickButton(passwordNumbers[8]);
              }}
            >
              <View>
                <Text style={styles.keyText}>{passwordNumbers[8]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowBox}>
            <TouchableOpacity
              style={styles.keyBox}
              onPress={() => {
                clickButton('all');
              }}
            >
              <View>
                <Text style={styles.allRemove}>전체 삭제</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyBox}
              onPress={() => {
                clickButton(passwordNumbers[9]);
              }}
            >
              <View>
                <Text style={styles.keyText}>{passwordNumbers[9]}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.keyBox}
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
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    backgroundColor: 'white',
    height: screenHeight,
    width: screenWidth,
  },
  container: {
    height: screenHeight * 0.8,
    width: screenWidth - 40,
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

export default SamplePWCheck;
