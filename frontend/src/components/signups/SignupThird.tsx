import React, { useEffect, useState } from 'react';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
type Page = {
  a: boolean;
  b: boolean;
  c: boolean;
};
interface SignupThirdProps {
  setPageData: (data: Page) => void;
  setEasyPassword: (password: string) => void;
  easyPassword: string;
  setCanSignup: (can: boolean) => void;
}

const SignupThird: React.FC<SignupThirdProps> = (props) => {
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
      // console.log(easyPass);
      // console.log(easyPass.length);
      // 수정 필요
      const nowEasyPass = easyPass + str;
      if (nowEasyPass === props.easyPassword) {
        return Alert.alert(
          '비밀번호 설정 완료',
          '올바른 비밀번호를 설정하셨습니다. 회원가입 페이지로 이동합니다.',
          [
            {
              text: '확인',
              onPress: async () => {
                props.setCanSignup(true)
                props.setPageData({
                  a: true,
                  b: false,
                  c: false,
                });
              },
            },
          ]
        );
      } else {
        return Alert.alert(
          '비밀번호 재확인',
          '비밀번호가 틀렸습니다. 기억이 안나신다면 재설정 버튼을 클릭해주세요.',
          [
            {
              text: '비밀번호 재설정',
              onPress: () => {
                props.setPageData({
                  a: false,
                  b: true,
                  c: false,
                });
              },
            },
            // 재귀
            {
              text: '재입력',
              onPress: async () => {
                return await setEasyPass('');
              },
            },
          ]
        );
      }
      // props.setEasyPassword(easyPass);
      // console.log(props.easyPassword)
      // console.log(easyPass+str)
      // return alert('다음페이지');
    }
    const tmpPass = (await easyPass) + str;
    await setEasyPass(tmpPass);
    await shuffle(numbers);
  }
  // useEffect(() => {
  //   if (easyPass.length == 6) {
  //     console.log(easyPass);
  //     console.log(easyPass.length);
  //     // 수정 필요
  //     props.setPageData({
  //       a: false,
  //       b: false,
  //       c: true,
  //     });
  //     props.setEasyPassword(easyPass)
  //   }
  // }, [easyPass.length == 6]);
  useEffect(() => {
    if (easyPass.length === 0) {
      setCompleteRound({
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
      });
    }
  }, [easyPass.length === 0]);

  return (
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
        <View>
          <TouchableOpacity
            style={styles.passwordBox}
            onPress={() => {
              props.setPageData({
                a: false,
                b: true,
                c: false,
              });
            }}
          >
            <Text style={styles.reselectPassword}>비밀번호 재설정</Text>
            <FontAwesome name="angle-right" size={35} />
          </TouchableOpacity>
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
  );
};

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.8,
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
    backgroundColor: 'green',
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
    color: 'green',
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
    backgroundColor: 'green',
    marginLeft: 5,
    marginRight: 5,
  },
  reselectPassword: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 5,
  },
  passwordBox: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
  },
});

export default SignupThird;
