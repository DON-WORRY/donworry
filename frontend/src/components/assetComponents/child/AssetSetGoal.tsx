import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { accountSetGoal } from '../../../utils/AccountFunctions';
import { Button } from '../../../components/logins/Login';

const { width, height } = Dimensions.get('screen');

const AssetSetGoal: React.FC<{
  updateRemainDate: (newRemainDate: number) => void;
}> = ({ updateRemainDate }) => {
  const bottomSheetModalRef: React.RefObject<any> = useRef(null);
  const snapPoints = useMemo(() => ['37%', '60%'], []);
  const [goalAmountInput, setGoalAmountInput] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const { dismiss } = useBottomSheetModal();

  const handleInputChange = (text: string) => {
    setGoalAmountInput(text);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const unformattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    const formattedDate = `${unformattedDate.substring(
      0,
      4
    )}-${unformattedDate.substring(4, 6)}-${unformattedDate.substring(6, 8)}`;

    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const calculateRemainingDays = (startDate: string, endDate: string) => {
    // 문자열 날짜를 Date 객체로 변환
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const SetGoal = async () => {
    const nowTime = new Date().toISOString();
    const dateOnly = nowTime.substring(0, 10);
    const endTime = selectedDate;
    let newGoal = null;

    if (!endTime) {
      alert('목표일을 설정해주세요');
      return;
    }
    if (goalAmountInput === '') {
      alert('목표금액을 설정해주세요');
      return;
    }
    if (!/^\d+$/.test(goalAmountInput)) {
      alert('목표 금액에 숫자만 입력해주세요');
      return;
    }
    newGoal = parseInt(goalAmountInput, 10);

    // 디데이 계산
    const remainingDays = calculateRemainingDays(dateOnly, endTime);

    const data = {
      goalAmount: newGoal,
      goalStartTime: dateOnly,
      goalEndTime: endTime,
    };

    try {
      await accountSetGoal(data);
      bottomSheetModalRef.current?.dismiss();
      setSelectedDate('');
      setGoalAmountInput('');
      updateRemainDate(remainingDays);
    } catch (e) {
      console.error('Failed to set goal:', e);
    }
  };

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

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          bottomSheetModalRef.current.present();
        }}
      >
        <View style={styles.rightSection}>
          <Text>설정</Text>
          <MaterialIcons
            style={{ marginLeft: 3 }}
            name="arrow-forward-ios"
            color={'grey'}
            size={width * 0.06}
          />
        </View>
      </TouchableOpacity>

      {/* BottomSheetModal 설정 */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={() => (
          <TouchableOpacity
            style={{
              flex: 1,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'transparent', // 배경색을 투명하게 설정
            }}
            onPress={() => {
              dismiss();
              setSelectedDate('');
              setGoalAmountInput('');
            }}
            activeOpacity={1}
          />
        )}
      >
        <View style={styles.container}>
          <View style={[styles.row, { marginTop: width * 0.1 }]}>
            <Text style={styles.setText}>목표일</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <TextInput
                style={[styles.textInput, { color: 'black' }]}
                placeholder="날짜 선택"
                editable={false}
                value={selectedDate}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.row]}>
            <Text style={styles.setText}>목표 금액</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginRight: width * 0.12
              }}
            >
              <TextInput
                style={[styles.textInput, {width: '81%'}]}
                placeholder="목표 금액"
                keyboardType="numeric"
                value={goalAmountInput}
                onChangeText={handleInputChange}
              />
              <Text style={[styles.setText, {fontSize: width * 0.055}]}>원</Text>
            </View>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Button
            title="목표설정"
            onPress={async () => {
              await SetGoal();
            }}
            style={{
              width: '160%',
              justifyContent: 'center',
              marginTop: width * 0.1,
            }}
            widthPercentage={0.9}
          />
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: width * 0.25,
    paddingRight: width * 0.25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width * 0.04,
    width: '150%',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  setText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    fontSize: width * 0.05,
    textAlign: 'right',
    width: width * 0.5,
    borderColor: 'gray',
    borderBottomWidth: 2.5,
    paddingHorizontal: 10,
  },
});

export default AssetSetGoal;
