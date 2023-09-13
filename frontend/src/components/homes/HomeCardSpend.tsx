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

const HomeCardSpend: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setIsExpanded(false);
    }
  }, [isFocused]);

  const data = [
    { card: 'BC카드', money: -323000 },
    { card: '농협카드', money: -45000 },
    { card: '국민카드', money: -823500 },
    { card: '신한카드', money: -35400 },
  ].sort((a, b) => a.money - b.money);
  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const totalAmount = data.reduce((sum, item) => sum + item.money, 0);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.headText}>카드 소비</Text>
        <Text style={[styles.headText, styles.amountText]}>
          {formatAmount(totalAmount.toString())}
        </Text>
      </View>

      {data.map((item, index) => {
        if (index < 4 || isExpanded) {
          return (
            <View key={index} style={styles.row}>
              <View style={styles.imageTextContainer}>
                <Image style={styles.imageStyle} source={images[item.card]} />
                <View style={styles.textContainer}>
                  <Text style={styles.cardContent}>{item.card}</Text>
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

export default HomeCardSpend;
