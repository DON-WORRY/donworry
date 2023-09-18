import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import ContentButton from '../ContentButton';
import { images } from '../../assets/bank&card';

const { width } = Dimensions.get('screen');

const formatAmount = (amount: string): string => {
  return parseInt(amount, 10).toLocaleString('ko-KR') + '원';
};

const HomeSpend: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setIsExpanded(false);
    }
  }, [isFocused]);

  const data = [
    { bank: '취미', money: -200000 },
    { bank: '식비', money: -342500 },
    { bank: '생활', money: -120000 },
    { bank: '쇼핑', money: -485000 },
    { bank: '기타', money: -79400 },
  ].sort((a, b) => a.money - b.money);
  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const totalAmount = data.reduce((sum, item) => sum + item.money, 0);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.headText}>소비</Text>
        <Text style={[styles.headText, styles.amountText]}>
          {formatAmount(totalAmount.toString())}
        </Text>
      </View>

      {data.map((item, index) => {
        if (index < 4 || isExpanded) {
          return (
            <View key={index} style={styles.row}>
              <View style={styles.imageTextContainer}>
                <Image style={styles.imageStyle} source={images[item.bank]} />
                <View style={styles.textContainer}>
                  <Text style={styles.cardContent}>{item.bank}</Text>
                  <Text style={styles.spendContent}>
                    {formatAmount(item.money.toString())}
                  </Text>
                </View>
              </View>
              <ContentButton />
            </View>
          );
        }
        return null;
      })}

      {data.length > 4 && (
        <TouchableOpacity onPress={handleToggle}>
          <Text>{isExpanded ? '접기' : '더보기'}</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: width * 0.03,
  },
  amountText: {
    textAlign: 'right',
  },
  imageStyle: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: (width * 0.13) / 2,
    // backgroundColor: 'purple'
  },
  imageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: width * 0.05,
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
    fontWeight: 'bold',
  },
});
export default HomeSpend;
