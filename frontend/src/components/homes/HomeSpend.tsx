import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import ContentButton from '../ContentButton'

const { width, height } = Dimensions.get('window');

const formatAmount = (amount: string): string => {
  return parseInt(amount, 10).toLocaleString('ko-KR') + '원';
};

const HomeSpend: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.headText}>소비</Text>
        <Text style={[styles.headText, styles.amountText]}>
          {formatAmount('-1050400')}
        </Text>
      </View>
      {/* 지출내역 한 행 (데이터 받아 반복문으로 변환) */}
      <View style={styles.row}>
        <View style={styles.imageTextContainer}>
          <Image
            style={styles.imageStyle}
            source={require('../../assets/bank&card/국민카드.jpg')}
          />
          <View style={styles.textContainer}>
            <Text style={styles.cardContent}>KB국민카드</Text>
            <Text style={styles.spendContent}>{formatAmount('-820000')}</Text>
          </View>
        </View>
        <ContentButton />
      </View>
      {/* 지출내역 한 행 (데이터 받아 반복문으로 변환) */}
      <View style={styles.row}>
        <View style={styles.imageTextContainer}>
          <Image
            style={styles.imageStyle}
            source={require('../../assets/bank&card/국민카드.jpg')}
          />
          <View style={styles.textContainer}>
            <Text style={styles.cardContent}>KB국민카드</Text>
            <Text style={styles.spendContent}>{formatAmount('-820000')}</Text>
          </View>
        </View>
        <ContentButton />
      </View>
      {/* 지출내역 한 행 (데이터 받아 반복문으로 변환) */}
      <View style={styles.row}>
        <View style={styles.imageTextContainer}>
          <Image
            style={styles.imageStyle}
            source={require('../../assets/bank&card/국민카드.jpg')}
          />
          <View style={styles.textContainer}>
            <Text style={styles.cardContent}>KB국민카드</Text>
            <Text style={styles.spendContent}>{formatAmount('-820000')}</Text>
          </View>
        </View>
        <ContentButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: width * 0.07,
  },
  amountText: {
    textAlign: 'right',
  },
  imageStyle: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: (width * 0.13) / 2,
  },
  imageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center', // 여기에서 'flex-start'를 사용하여 아이템들이 상단에 정렬되게 할 수 있습니다.
    marginBottom: width * 0.05,
  },
  textContainer: {
    justifyContent: 'flex-start',
    marginLeft: width * 0.04,
  },
  cardContent: {
    textAlign: 'left',
    color: 'grey',
  },
  spendContent: {
    textAlign: 'left',
    fontSize: width * 0.05,
  },
});

export default HomeSpend;
