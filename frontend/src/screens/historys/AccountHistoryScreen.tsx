import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../assets/bank&card';
import { accountTradeHistory } from '../../utils/AccountFunctions';

interface ScreenProps {
  navigation: {
    goBack: (screen: string, params?: any) => void;
  };
}
interface accountDetailItem {
  cardName: string;
  consumptionDetail: string;
  consumptionRemainedAmount: number;
  consumptionPrice: number;
  createTime: string;
}

const width = Dimensions.get('screen').width;

const HistoryScreen: React.FC = () => {
  const route = useRoute<any>();
  const accountId = route.params ? route.params.accountId : null;
  const [accountDetail, setaccountDetail] = useState<
    Record<string, accountDetailItem[]>
  >({});
  const [nowAmount, setnowAmount] = useState<number>(0);
  const blackLogo = require('../../assets/logo/BlackLogo.png');
  const navigation = useNavigation<ScreenProps['navigation']>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetch = async () => {
      try {
        const newAccountDetail: any = await accountTradeHistory(accountId);
        const groupedData = newAccountDetail.data.list.reduce(
          (
            acc: Record<string, accountDetailItem[]>,
            cur: accountDetailItem
          ) => {
            if (cur.createTime) {
              const createdDate = cur.createTime.split('T')[0].slice(5);
              if (!acc[createdDate]) acc[createdDate] = [];
              acc[createdDate].push(cur);
            }
            return acc;
          },
          {}
        );
        setnowAmount(newAccountDetail.data.list[0].consumptionRemainedAmount);
        setaccountDetail(groupedData);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetch();
  }, []);

  const loadMoreData = () => {
    setCurrentPage(currentPage + 1);
  };

  function formatDate(dateString: string): string {
    const [month, day] = dateString.split('-');
    const formattedMonth = parseInt(month, 10);
    const formattedDay = parseInt(day, 10);
    return `${formattedMonth}월 ${formattedDay}일`;
  }

  const formatAmount = (amount: string): string => {
    return parseInt(amount, 10).toLocaleString('ko-KR') + '원';
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
        style={[
          styles.row,
          {
            width: '100%',
            marginTop: width * 0.05,
            marginBottom: width * 0.01,
          },
        ]}
      >
        <Text style={styles.headText}>잔고</Text>
        <Text style={styles.headText}>
          {formatAmount(nowAmount.toString())}
        </Text>
      </View>

      <FlatList
        data={Object.keys(accountDetail || {}).slice(
          0,
          currentPage * itemsPerPage
        )}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: date }) => (
          <View>
            <View style={[styles.row]}>
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </View>
            <View style={styles.line} />
            {accountDetail[date].map((detail, index) => (
              <View
                style={[styles.row, { marginTop: width * 0.02 }]}
                key={index}
              >
                <Image
                  style={styles.imageStyle}
                  source={images[detail.cardName]}
                />
                <Text style={[styles.itemText, { flex: 1 }]}>
                  {detail.consumptionDetail}
                </Text>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.itemText}>
                    -{formatAmount(detail.consumptionPrice.toString())}
                  </Text>
                  <Text>
                    {formatAmount(detail.consumptionRemainedAmount.toString())}
                  </Text>
                </View>
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
    marginRight: width * 0.02,
  },
  textContainer: {
    justifyContent: 'flex-start',
    marginLeft: width * 0.04,
  },
  accountContent: {
    textAlign: 'left',
    color: 'grey',
  },
  spendContent: {
    textAlign: 'left',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  dateText: {
    paddingVertical: 10,
    fontSize: width * 0.05,
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
    borderBottomColor: 'black',
    marginBottom: 10,
  },
});

export default HistoryScreen;
