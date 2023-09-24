import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { images } from '../../assets/bank&card';
import BackHeader from '../../components/BackHeader';

const width = Dimensions.get('screen').width;

const data = [
  {
    card: '국민카드',
    day: '20230919',
    category: '식비',
    name: '신쭈꾸미 수완점',
    money: 32000,
  },
  {
    card: '국민카드',
    day: '20230919',
    category: '쇼핑',
    name: '신세계백화점 아디다스',
    money: 198000,
  },
  {
    card: '국민카드',
    day: '20230919',
    category: '교통',
    name: '카카오 택시',
    money: 6300,
  },
  {
    card: '국민카드',
    day: '20230919',
    category: '식비',
    name: '버거킹',
    money: 11000,
  },
  {
    card: '국민카드',
    day: '20230918',
    category: '여가',
    name: 'Riot 게임즈',
    money: 20000,
  },
  {
    card: '국민카드',
    day: '20230918',
    category: '식비',
    name: '한솥 도시락 수완점',
    money: 9000,
  },
  {
    card: '국민카드',
    day: '20230918',
    category: '쇼핑',
    name: '무신사',
    money: 45000,
  },
  {
    card: '국민카드',
    day: '20230917',
    category: '교통',
    name: '코레일',
    money: 33200,
  },
  {
    card: '국민카드',
    day: '20230917',
    category: '식비',
    name: '컴포즈 커피',
    money: 4000,
  },
  {
    card: '국민카드',
    day: '20230917',
    category: '여가',
    name: 'Riot 게임즈',
    money: 15000,
  },
  {
    card: '국민카드',
    day: '20230917',
    category: '식비',
    name: 'GS 25',
    money: 9000,
  },
  {
    card: '국민카드',
    day: '20230916',
    category: '기타',
    name: '네이버페이',
    money: 50000,
  },
  {
    card: '국민카드',
    day: '20230916',
    category: '교통',
    name: '코레일',
    money: 33200,
  },
  {
    card: '국민카드',
    day: '20230916',
    category: '식비',
    name: '스타벅스',
    money: 14800,
  },
  {
    card: '국민카드',
    day: '20230915',
    category: '여가',
    name: 'Smilgate',
    money: 55000,
  },
  {
    card: '국민카드',
    day: '20230915',
    category: '식비',
    name: '신쭈꾸미 수완점',
    money: 32000,
  },
  {
    card: '국민카드',
    day: '20230914',
    category: '기타',
    name: '카카오페이',
    money: 10000,
  },
  {
    card: '국민카드',
    day: '20230914',
    category: '교통',
    name: '카카오 택시',
    money: 8700,
  },
  {
    card: '국민카드',
    day: '20230914',
    category: '식비',
    name: '나주 곰탕',
    money: 12000,
  },
  {
    card: '국민카드',
    day: '20230913',
    category: '식비',
    name: '벌크 커피',
    money: 2500,
  },
];

data.sort((a, b) => Number(b.day) - Number(a.day));

interface DataItem {
  card: string;
  day: string;
  category: string;
  name: string;
  money: number;
}
const HistoryScreen: React.FC = () => {
  const [totalMoneys, setTotalMoneys] = useState<Record<string, number>>({});
  const [groupedData, setGroupedData] = useState<Array<[string, DataItem[]]>>(
    []
  );
  const [totalMoney, setTotalMoney] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  const loadMoreItems = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    const paginatedData = data.slice(0, nextPage * itemsPerPage);
    const newGroupedData: Record<string, DataItem[]> = {};
    const newTotalMoneys: Record<string, number> = {};

    paginatedData.forEach((item) => {
      const dateKey = item.day;
      if (!newGroupedData[dateKey]) {
        newGroupedData[dateKey] = [];
        newTotalMoneys[dateKey] = 0;
      }
      newGroupedData[dateKey].push(item);
      newTotalMoneys[dateKey] += item.money;
    });

    const sortedNewGroupedData = Object.entries(newGroupedData).sort(
      ([a], [b]) => b.localeCompare(a)
    );
    setTotalMoneys(newTotalMoneys);
    setGroupedData(sortedNewGroupedData);
  };

  useEffect(() => {
    loadMoreItems();
    const total = data.reduce((acc, curr) => acc + curr.money, 0);
    setTotalMoney(total);
  }, [data]);

  return (
    <View style={styles.container}>
      <BackHeader screen="Home" />
      <View
        style={{
          flexDirection: 'row', // This will arrange child items in a single row
          justifyContent: 'flex-start', // This will evenly distribute items
          alignItems: 'center', // This will center items vertically
          width: '100%',
          marginTop: width * 0.05,
        }}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={width * 0.05}
          style={{ marginTop: -width * 0.014 }}
        />
        <Text style={styles.headText}>9월 소비</Text>
        <MaterialIcons
          name="arrow-forward-ios"
          size={width * 0.05}
          style={{ marginTop: -width * 0.014 }}
        />
      </View>

      <View style={[styles.row, { width: '100%' }]}>
        <Text style={styles.headText}>내역</Text>
        <Text style={styles.headText}>
          지출 {totalMoney.toLocaleString()}원
        </Text>
      </View>
      <FlatList
        data={groupedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const [date, items] = item;

          // 날짜 형식 변환
          const year = date.slice(0, 4);
          let month = parseInt(date.slice(4, 6), 10);
          let day = parseInt(date.slice(6, 8), 10);
          const formattedDate = `${month}월 ${day}일`;

          // 하루의 전체 금액 계산
          const totalMoney = totalMoneys[date] || 0;

          return (
            <View>
              <View style={[styles.row, { marginTop: width * 0.02 }]}>
                <Text style={styles.dateText}>{formattedDate}</Text>
                <Text style={styles.dateText}>
                  -{totalMoney.toLocaleString()}원
                </Text>
              </View>
              <View style={styles.line}></View>
              {items.map((item, index) => (
                <View
                  style={[styles.row, { marginTop: width * 0.015 }]}
                  key={index}
                >
                  <Image
                    style={styles.imageStyle}
                    source={images[item.category]}
                  />
                  <Text style={[styles.itemText, { flex: 1 }]}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemText}>
                    -{item.money.toLocaleString()}원
                  </Text>
                </View>
              ))}
            </View>
          );
        }}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
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
