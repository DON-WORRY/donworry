import React, { useState, useEffect, useMemo, useRef } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TextInput,
  Keyboard,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BackHeader from '../components/BackHeader';
import { RouteProp } from '@react-navigation/core';
import { images } from '../assets/bank&card';
import { wireTransfer, accountCheck } from '../utils/AccountFunctions';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Button } from '../components/logins/Login';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const width = Dimensions.get('screen').width;

const categoryData = [
  { label: '교통', value: 1 },
  { label: '생활', value: 2 },
  { label: '식비', value: 3 },
  { label: '쇼핑', value: 4 },
  { label: '여가', value: 5 },
  { label: '기타', value: 6 },
];

type RootStackParamList = {
  WireTransfer: {
    accounts: Array<any>;
    accountId: number;
  };
};
type WireTransferRouteProp = RouteProp<RootStackParamList, 'WireTransfer'>;

interface WireTransferProps {
  route: WireTransferRouteProp;
}
const WireTransferScreen: React.FC<WireTransferProps> = ({ route }) => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  const { accounts, accountId } = route.params;
  const filteredAccounts = accounts.filter(
    (account) => account.accountId !== accountId
  );
  const [accountNumber, setAccountNumber] = useState('');
  const [choiceCategory, setChoiceCategory] = useState(0);
  const [sendingPrice, setSendingPrice] = useState('');
  const [sendingAccount, setSendingAccount] = useState('');
  const bottomSheetModalRef: React.RefObject<any> = useRef(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0); // 초기값 설정
  const [items, setItems] = useState<{ label: string; value: number }[]>([]);
  const snapPoints = useMemo(() => ['45%', '60%'], []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        bottomSheetModalRef.current?.snapToIndex(1); // 모달을 완전히 확장합니다.
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        bottomSheetModalRef.current?.snapToIndex(0); // 모달을 원래 위치로 복귀합니다.
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isFocused]);

  useEffect(() => {
    setItems(categoryData);
  }, []);

  const sendingMoney = async () => {
    if (value === 0) {
      alert('카테고리를 선택해주세요');
      return;
    }
    const parsedPrice = parseInt(sendingPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('금액을 입력해주세요');
      return;
    }

    const data = {
      accountId: accountId,
      accountNumber: sendingAccount,
      price: parsedPrice,
      consumptionCategoryId: value,
    };

    const isErrorWithResponse = (error: any): error is { response: { data: { message: string } } } => {
      return error && error.response && error.response.data && typeof error.response.data.message === 'string';
    };

    try {
      // await wireTransfer(data);
      navigation.navigate('SimplePWCheckScreen', { refresh: Date.now() });
    } catch (error) {
      if (isErrorWithResponse(error)) {
        alert(error.response.data.message); // API에서 반환하는 에러 메시지를 보여줍니다.
      } else {
        alert('송금 중 오류가 발생했습니다.'); // 기본 오류 메시지
      }
      console.log('Error during wire transfer:', error); // console.error 대신 console.log를 사용
    }
  }
  

  return (
    <BottomSheetModalProvider>
      <View style={[styles.container, { paddingTop: 60 }]}>
        <BackHeader screen="Asset" />
        <ScrollView
          style={{ flex: 1, width: '90%' }}
          contentContainerStyle={styles.dcontainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.headText}>송금하기</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="계좌번호 입력"
              keyboardType="numeric"
              value={accountNumber}
              onChangeText={(text) => setAccountNumber(text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                bottomSheetModalRef.current.present();
                setSendingAccount(accountNumber);
              }}
              activeOpacity={0.9}
            >
              <Text style={styles.buttonText}>송금</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.headText}>내 계좌</Text>
          {filteredAccounts.map((account, index) => (
            <TouchableOpacity
              key={index}
              style={{ flex: 1, width: '100%' }}
              onPress={() => {
                bottomSheetModalRef.current.present();
                setSendingAccount(account.accountNumber);
                setSendingPrice('')
              }}
            >
              <View style={styles.row}>
                <Image
                  style={styles.imageStyle}
                  source={images[account.bankName]}
                />
                <View style={{ marginLeft: width * 0.05 }}>
                  <Text style={styles.bankName}>{account.bankName}</Text>
                  <Text style={styles.accountNumber}>
                    {account.accountNumber}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <Text style={[styles.headText, {marginTop: width * 0.1}]}>최근 송금 계좌</Text>
          {filteredAccounts.map((account, index) => (
            <TouchableOpacity
              key={index}
              style={{ flex: 1, width: '100%' }}
              onPress={() => {
                bottomSheetModalRef.current.present();
                setSendingAccount(account.accountNumber);
                setSendingPrice('')
              }}
            >
              <View style={styles.row}>
                <Image
                  style={styles.imageStyle}
                  source={images[account.bankName]}
                />
                <View style={{ marginLeft: width * 0.05 }}>
                  <Text style={styles.bankName}>{account.bankName}</Text>
                  <Text style={styles.accountNumber}>
                    {account.accountNumber}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={() => (
            <TouchableOpacity
              style={styles.backSheet}
              onPress={() => {
                bottomSheetModalRef.current?.dismiss();
                setValue(0);
              }}
              activeOpacity={1}
            />
          )}
        >
          <View style={styles.container}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  marginTop: width * 0.1,
                  marginBottom: 0,
                  justifyContent: 'space-between',
                  width: '90%',
                  alignItems: 'center',
                },
              ]}
            >
              <Text>목표 금액</Text>
              <View>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  style={{ width: width * 0.3 }}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder={'카테고리'}
                />
              </View>
            </View>
            <View style={styles.bottomSheetItem}>
              <TextInput
                style={[styles.textInput, { width: '90%' }]}
                placeholder="송금 금액"
                keyboardType="numeric"
                value={String(sendingPrice)}
                onChangeText={(text) => setSendingPrice(text)}
              />
            </View>
            {/* <View style={styles.bottomSheetItem}>
              <TextInput
                style={[styles.textInput, { width: '90%' }]}
                placeholder="2차 비밀번호"
                keyboardType="numeric"
                value={simplePassword}
                onChangeText={(text) => setSimplePassword(text)}
              />
            </View> */}
            <Button
              title="송금하기"
              onPress={async () => {
                await sendingMoney();
              }}
              style={{ justifyContent: 'center' }}
              widthPercentage={0.9}
            />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  dcontainer: {
    marginTop: width * 0.1,
    alignItems: 'flex-start',
    width: '100%',
  },
  imageStyle: {
    width: width * 0.13,
    height: width * 0.13,
    backgroundColor: 'white',
    borderRadius: (width * 0.13) / 2,
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: width * 0.03,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  bankName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountNumber: {
    fontSize: 14,
    color: '#7f7f7f',
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
  },
  textInput: {
    height: width * 0.14,
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    marginBottom: width * 0.1,
    fontSize: width * 0.05,
  },
  button: {
    position: 'absolute',
    top: width * 0.035,
    height: width * 0.09,
    width: width * 0.13,
    backgroundColor: '#7777F3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
  },
  buttonText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: 'white',
  },
  headText: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    marginBottom: width * 0.01,
  },
  backSheet: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  bottomSheetItem: {
    width: '100%',
    marginTop: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WireTransferScreen;
