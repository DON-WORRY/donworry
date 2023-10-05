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
import { Button } from '../ContentButton';
import { useNavigation } from '@react-navigation/native';
import { accountCardHistory } from '../../utils/AccountFunctions';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const bankImages: { [key: string]: any } = {
  국민은행: require('../../assets/bank&card/국민은행.png'),
  국민카드: require('../../assets/bank&card/국민카드.png'),
  기업은행: require('../../assets/bank&card/기업은행.png'),
  NH농협은행: require('../../assets/bank&card/농협은행.png'),
  농협카드: require('../../assets/bank&card/농협카드.png'),
  롯데카드: require('../../assets/bank&card/롯데카드.png'),
  삼성카드: require('../../assets/bank&card/삼성카드.png'),
  새마을금고: require('../../assets/bank&card/새마을금고.png'),
  신한은행: require('../../assets/bank&card/신한은행.png'),
  신한카드: require('../../assets/bank&card/신한카드.png'),
  신협은행: require('../../assets/bank&card/신협은행.png'),
  우리은행: require('../../assets/bank&card/우리은행.png'),
  우리카드: require('../../assets/bank&card/우리카드.png'),
  우체국: require('../../assets/bank&card/우체국.png'),
  카카오뱅크: require('../../assets/bank&card/카카오뱅크.png'),
  토스뱅크: require('../../assets/bank&card/토스뱅크.png'),
  하나은행: require('../../assets/bank&card/하나은행.png'),
  하나카드: require('../../assets/bank&card/하나카드.png'),
  현대카드: require('../../assets/bank&card/현대카드.png'),
  BC카드: require('../../assets/bank&card/BC카드.png'),
  대신은행: require('../../assets/bank&card/대신은행.png'),
  대화은행: require('../../assets/bank&card/대화은행.png'),
  평화은행: require('../../assets/bank&card/평화은행.png'),
  광주은행: require('../../assets/bank&card/광주은행.png'),
  신세계카드: require('../../assets/bank&card/신세계카드.png'),
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
                  source={bankImages[item.cardCompanyName]}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.cardContent}>{item.cardCompanyName}</Text>
                  <Text style={styles.spendContent}>
                    {formatAmount(item.consumptionTotalPrice.toString())}
                  </Text>
                </View>
              </View>
                <Button 
                title="조회"
                onPress={() => {
                  navigation.navigate('StackNavigation', {
                    screen: 'CardHistory',
                    params: { cardId: item.cardId, cards: cardSpend },
                  });
                }}/>
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
