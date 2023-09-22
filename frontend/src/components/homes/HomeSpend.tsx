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
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { consumptionCategoryTotal } from '../../utils/ConsumptionFunctions';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // 읽기 에러
    console.error(e);
    throw e;
  }
};

const { width } = Dimensions.get('screen');

const formatAmount = (amount: string): string => {
  return parseInt(amount, 10).toLocaleString('ko-KR') + '원';
};

const HomeSpend: React.FC = () => {
  const [memberId, setMemberId] = useState('');
  const navigation = useNavigation<ScreenProps['navigation']>();
  const [totalSpend, setTotalSpend] = useState<Array<{ amount: number; category: string }>>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setIsExpanded(false);
    }
  }, [isFocused]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const today = new Date(); 
        const currentMonth = today.getMonth() + 1;

        const newMemberId = await getData('memberId');
        const newTotalSpend: any = await consumptionCategoryTotal(currentMonth); 
        if (newMemberId) {
          setMemberId(newMemberId);
        }
        if (newTotalSpend && newTotalSpend.data && Array.isArray(newTotalSpend.data.categoryAmountList)) {
          setTotalSpend(newTotalSpend.data.categoryAmountList);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetch();
  }, []);

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };  

  const processedData = (totalSpend || [])
    .map((item) => ({
      category: item.category,
      amount: -item.amount, // 음수로 표시하려면 '-'를 붙여야 함
    }))
    .sort((a, b) => a.amount - b.amount);

  const totalAmount = processedData.reduce((sum, item) => sum + item.amount, 0);

  console.log(memberId)

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.headText}>소비</Text>
        <Text style={[styles.headText, styles.amountText]}>
          {formatAmount(totalAmount.toString())}
        </Text>
      </View>

      {processedData.map((item, index) => {
        if (index < 4 || isExpanded) {
          return (
            <View key={index} style={styles.row}>
              <View style={styles.imageTextContainer}>
                <Image
                  style={styles.imageStyle}
                  source={images[item.category]}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.cardContent}>{item.category}</Text>
                  <Text style={styles.spendContent}>
                    {formatAmount(item.amount.toString())}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('StackNavigation', { screen: 'History' });
                }}
              >
                <ContentButton />
              </TouchableOpacity>
            </View>
          );
        }
        return null;
      })}
      {processedData.length > 4 && (
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
export default HomeSpend;