import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { accountSetGoal } from '../../../utils/AccountFunctions';
import { Button } from '../../../components/logins/Login';

const AssetSetGoal: React.FC<{
  updateRemainDate: (newRemainDate: number) => void;
}> = ({ updateRemainDate }) => {
  const bottomSheetModalRef: React.RefObject<any> = useRef(null);
  const snapPoints = useMemo(() => ['35%'], []);
  const [goalAmountInput, setGoalAmountInput] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

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

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          console.log(bottomSheetModalRef);
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
      >
        <View style={styles.container}>
          <View style={styles.row}>
            <Text>목표 금액</Text>
            <TextInput
              style={styles.textInput}
              placeholder="목표 금액"
              keyboardType="numeric"
              value={goalAmountInput}
              onChangeText={handleInputChange}
            />
          </View>
          <View style={styles.row}>
            <Text>목표일</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <TextInput
                style={[styles.textInput, { color: 'black' }]}
                placeholder="날짜 선택"
                editable={false}
                value={selectedDate}
              />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <Button
          title="목표설정"
          onPress={async () => {
            await SetGoal();
          }}
          widthPercentage={0.9}
        />
      </BottomSheetModal>
    </View>
  );
};

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: width * 0.25,
    paddingRight: width * 0.25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width * 0.02,
    width: '100%',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textInput: {
    height: 40,
    width: width * 0.3,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default AssetSetGoal;
