import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

interface ConsumptionDataProps {
  consumptionData: {
    bankName: string;
    detail: string;
    price: number;
    dateTime: string;
    id: number;
  };
}

const ConsumptionList: React.FC<ConsumptionDataProps> = (props) => {
  const blackLogo = require('../../assets/logo/BlackLogo.png');
  const navigation = useNavigation<ScreenProps['navigation']>();

  function formattedTime(inputDateTime: string) {
    const parsedDate = new Date(inputDateTime);
    // 시간 추출
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();

    // 시간을 두 자리 숫자로 포맷팅
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // 오전(AM) 또는 오후(PM) 추가
    const period = hours < 12 ? '오전' : '오후';

    // "HH:mm" 형식으로 반환
    return `${period} ${formattedHours}:${formattedMinutes}`;
  }

  function formattedDetail(inputDetail: string) {
    const maxLength = 10; // 최대 길이 설정
    if (inputDetail.length > maxLength) {
      return inputDetail.slice(0, maxLength) + '...'; // 10글자 초과 시 "..." 추가
    }
    return inputDetail; // 10글자 이하인 경우 그대로 반환
  }

  function formattedPrice(inputPrice: number) {
    const formatter = new Intl.NumberFormat('en-US').format(inputPrice);
    return formatter;
  }

  return (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() => {
        navigation.navigate('StackNavigation', {
          screen: 'DutchpayRequest',
          params: props.consumptionData,
        });
      }}
    >
      <View style={styles.listViewLeft}>
        <Image source={blackLogo} style={styles.listLogo} />
        <View style={styles.listTitleView}>
          <Text>{formattedDetail(props.consumptionData.detail)}</Text>
          <Text style={styles.listBankText}>
            {props.consumptionData.bankName}
          </Text>
        </View>
        <View style={styles.listTimeView}>
          <Text style={styles.listTimeText}>
            {formattedTime(props.consumptionData.dateTime)}
          </Text>
        </View>
      </View>
      <View style={styles.listViewRight}>
        <Text>-{formattedPrice(props.consumptionData.price)}원</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listLogo: {
    height: 40,
    width: 40,
  },
  listTitleView: {
    justifyContent: 'space-around',
  },
  listBankText: {
    color: 'gray',
    fontSize: 10,
    marginTop: 2,
  },
  listTimeView: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  listTimeText: {
    fontSize: 9,
  },
  listViewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listViewRight: {
    justifyContent: 'center',
  },
});

export default ConsumptionList;
