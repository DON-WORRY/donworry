import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { accountCardDetail } from '../../utils/AccountFunctions';
import CardPicker from '../../components/historys/CardPicker';
import { images } from '../../assets/bank&card';

interface ScreenProps {
  navigation: {
    goBack: (screen: string, params?: any) => void;
  };
}
interface CardDetailItem {
  category: string;
  consumptionDetail: string;
  consumptionId: number;
  consumptionPrice: number;
  createdTime: string;
}

const width = Dimensions.get('screen').width;

const CardHistoryScreen: React.FC = () => {
  const route = useRoute<any>();
  const [selectedCardId, setSelectedCardId] = useState(route.params.cardId);
  const cards = route.params ? route.params.cards : null;
  const [cardDetail, setCardDetail] = useState<{
    groupedData: Record<string, CardDetailItem[]>;
    sumsByDate: Record<string, number>;
  }>({
    groupedData: {},
    sumsByDate: {},
  });
  const [nowMonth, setNowMonth] = useState(0);
  const [checkMonth, setCheckMonth] = useState(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const blackLogo = require('../../assets/logo/BlackLogo.png');
  const navigation = useNavigation<ScreenProps['navigation']>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetch = async () => {
      const today = new Date().toISOString();
      const year = today.substring(0, 4);
      const month = today.substring(5, 7);
      const yearMonth = parseInt(year + month, 10);
      setNowMonth(yearMonth);
      setCheckMonth(yearMonth);

      await processCardDetails(selectedCardId, yearMonth);
    };
    fetch();
  }, [selectedCardId]);
  console.log(selectedCardId);
  // 카드 내역 가져오는 함수 (카드Id, 요청년월(202309))
  const processCardDetails = async (cardId: number, yearMonth: number) => {
    try {
      const newCardDetail: any = await accountCardDetail(cardId, yearMonth);
      const groupedData = newCardDetail.data.reduce(
        (acc: Record<string, CardDetailItem[]>, cur: CardDetailItem) => {
          const createdDate = cur.createdTime.split('T')[0].slice(5);
          if (!acc[createdDate]) acc[createdDate] = [];
          acc[createdDate].push(cur);
          return acc;
        },
        {}
      );

      const sumsByDate: { [key: string]: number } = {};
      Object.keys(groupedData).forEach((date) => {
        sumsByDate[date] = groupedData[date].reduce(
          (sum: number, item: CardDetailItem) => sum + item.consumptionPrice,
          0
        );
      });
      setCardDetail({ groupedData, sumsByDate });
      setTotalPrice(Object.values(sumsByDate).reduce((a, b) => a + b, 0));
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const loadMoreData = () => {
    setCurrentPage(currentPage + 1);
  };

  function formattedDateDayOfTheWeek(dateTime: string): string {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const parts = dateTime.split('-');
    const month = parseInt(parts[0], 10) - 1;
    const day = parseInt(parts[1], 10);
    const date = new Date(new Date().getFullYear(), month, day);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${day}일 ${dayOfWeek}요일`;
  }

  const formatAmount = (amount: string): string => {
    return parseInt(amount, 10).toLocaleString('ko-KR') + '원';
  };

  function formatAddDot(input: number) {
    const inputString = String(input);
    const lastIndex = inputString.length - 2;
    const formattedString =
      inputString.slice(0, lastIndex) + '.' + inputString.slice(lastIndex); // 문자열 조작
    return formattedString;
  }

  const decreaseMonth = () => {
    if (checkMonth > 202201) {
      let newYear = Math.floor(checkMonth / 100);
      let newMonth = checkMonth % 100;

      newMonth -= 1;

      if (newMonth < 1) {
        newMonth = 12;
        newYear -= 1;
      }

      const newCheckMonth = newYear * 100 + newMonth;

      setCheckMonth(newCheckMonth);
      processCardDetails(selectedCardId, newCheckMonth);
    }
  };

  const increaseMonth = () => {
    if (checkMonth !== nowMonth) {
      let newYear = Math.floor(checkMonth / 100);
      let newMonth = checkMonth % 100;

      newMonth += 1;

      if (newMonth > 12) {
        newMonth = 1;
        newYear += 1;
      }

      const newCheckMonth = newYear * 100 + newMonth;

      setCheckMonth(newCheckMonth);
      processCardDetails(selectedCardId, newCheckMonth);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, { width: '100%' }]}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          onPress={() => {
            navigation.goBack('TabNavigation', { screen: 'Friend' });
          }}
        />
        <Image source={blackLogo} style={styles.logo} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: width,
          marginTop: width * 0.05,
          marginBottom: width * 0.03,
        }}
      >
        <Text style={styles.headTitleText}>카드</Text>
        <CardPicker
          cardId={selectedCardId}
          setCardId={setSelectedCardId}
          cards={cards}
        />
      </View>

      <View
        style={[
          styles.headerMiddleRow,
          { width: width * 0.9, marginBottom: width * 0.01 },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              decreaseMonth();
            }}
          >
            <AntDesign name="caretleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headDateText}>{formatAddDot(checkMonth)}</Text>
          <TouchableOpacity
            onPress={() => {
              increaseMonth();
            }}
          >
            <AntDesign name="caretright" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.headText, { marginTop: 5 }]}>
          지출 {formatAmount(totalPrice.toString())}
        </Text>
      </View>

      <FlatList
        data={Object.keys(cardDetail.groupedData || {}).slice(
          0,
          currentPage * itemsPerPage
        )}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: date }) => (
          <View>
            <View style={[styles.row, { marginTop: 20 }]}>
              <Text style={styles.dateText}>
                {formattedDateDayOfTheWeek(date)}
              </Text>
              <Text style={styles.dateText}>
                {formatAmount(cardDetail.sumsByDate[date].toString())}
              </Text>
            </View>
            <View style={styles.line} />
            {cardDetail.groupedData[date].map((detail, index) => (
              <View
                style={[styles.row, { marginTop: width * 0.015 }]}
                key={index}
              >
                <Image
                  style={styles.imageStyle}
                  source={images[detail.category || '송금']}
                />

                <Text style={[styles.itemText, { flex: 1 }]}>
                  {detail.consumptionDetail}
                </Text>
                <Text style={styles.itemText}>
                  -{formatAmount(detail.consumptionPrice.toString())}
                </Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.04,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  logo: {
    height: 40,
    width: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headTitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: width * 0.07,
    marginBottom: width * 0.03,
  },
  headerMiddleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headDateText: {
    fontSize: width * 0.06,
    fontWeight: '500',
  },
  headText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  amountText: {
    textAlign: 'right',
  },
  imageStyle: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: (width * 0.13) / 2,
    marginRight: width * 0.02,
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
  dateText: {
    paddingVertical: 5,
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  line: {
    height: 0,
    width: width * 0.9,
    borderBottomWidth: 1,
    borderBottomColor: '#7777F3',
    marginBottom: 10,
  },
});

export default CardHistoryScreen;
