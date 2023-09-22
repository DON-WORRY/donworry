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
import { accountCardHistory } from '../../utils/AccountFunctions';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const { width } = Dimensions.get('screen');

const formatAmount = (amount: string): string => {
  return parseInt(amount, 10).toLocaleString('ko-KR') + '원';
};

const HomeCardSpend: React.FC = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  const [isExpanded, setIsExpanded] = useState(false);
  const isFocused = useIsFocused();
  const [cardSpend, setCardSpend] = useState<
    Array<{ cardCompanyName: string; cardId: number; consumptionTotalPrice: number }>
  >([]);
  const [totalCardSpend, setTotalCardSpend] = useState(0);

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

        const newCardSpend: any = await accountCardHistory(currentMonth);
        if (
          newCardSpend &&
          newCardSpend.data &&
          Array.isArray(newCardSpend.data.eachCardConsumptionTotalPriceList)
        ) {
          setCardSpend(newCardSpend.data.eachCardConsumptionTotalPriceList);
          setTotalCardSpend(newCardSpend.data.cardConsumptionTotalPrice);
        }
      } catch (error) {
        console.error('에러:', error);
      }
    };
    fetch();
  }, []);

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.headText}>카드 소비</Text>
        <Text style={[styles.headText, styles.amountText]}>
          {formatAmount(totalCardSpend.toString())}
        </Text>
      </View>

      {cardSpend.map((item, index) => {
        if (index < 4 || isExpanded) {
          return (
            <View key={index} style={styles.row}>
              <View style={styles.imageTextContainer}>
                <Image
                  style={styles.imageStyle}
                  source={images[item.cardCompanyName]}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.cardContent}>{item.cardCompanyName}</Text>
                  <Text style={styles.spendContent}>
                    {formatAmount(item.consumptionTotalPrice.toString())}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('StackNavigation', {
                    screen: 'History',
                    params: { cardId: item.cardId }, // 추가 정보를 params 속성을 통해 전달
                  });
                }}
              >
                <ContentButton />
              </TouchableOpacity>
            </View>
          );
        }
        return null;
      })}

      {cardSpend.length > 4 && (
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
