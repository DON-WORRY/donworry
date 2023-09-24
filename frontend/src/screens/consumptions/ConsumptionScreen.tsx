import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import BackHeader from '../../components/BackHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { consumptionCategoryHistory } from '../../utils/ConsumptionFunctions';
import ConsumptionList from '../../components/consumptions/ConsumptionList';
import { SelectList } from 'react-native-dropdown-select-list';

interface ConsumptionDataProps {
  bankName: string;
  detail: string;
  price: number;
  dateTime: string;
  id: number;
}
interface ConsumptionResponseProps {
  categoryHistoryResponseList: ConsumptionDataProps[];
  total: any;
}
const ConsumptionScreen: React.FC = () => {
  const [consumptionData, setConSumptionData] =
    useState<ConsumptionResponseProps>();

  const [categorySelected, setCategorySelected] = useState<number>(0);
  const data = [
    { key: '1', value: '전체' },
    { key: '2', value: '식비' },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await consumptionCategoryHistory(0, 7);
        if (response) {
          // setConSumptionData(response.categoryHistoryResponseList);
          // setTotalSpendMoney(response.total);
          setConSumptionData({
            categoryHistoryResponseList: response.categoryHistoryResponseList,
            total: response.total,
          });
          console.log(response.total);
        } else {
          console.error('API response does not contain data.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    fetchData();
  }, []);

  function formattedDateDayOfTheWeek(dateTime: string): string {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateTime);
    const day = date.getDate();
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${day}일 ${dayOfWeek}요일`;
  }

  function formattedDate(dateTime: string): number {
    const date = new Date(dateTime);
    return date.getDate();
  }

  function formattedPrice(inputPrice: number) {
    const formatter = new Intl.NumberFormat('en-US').format(inputPrice);
    return formatter;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader screen="Spend" />
      <View style={styles.subContainer}>
        <Text style={styles.headerTitleText}>소비</Text>
        <Text>9월</Text>
        <View style={styles.headerDateView}>
          <SelectList
            setSelected={(val: number) => setCategorySelected(val)}
            data={data}
            save="key"
            search={false}
            boxStyles={{ borderRadius: 10 }}
            defaultOption={{ key: '1', value: '전체' }}
          />
        </View>

        <Text>지출 : {formattedPrice(consumptionData?.total)}원</Text>

        <ScrollView style={styles.listScrollView}>
          {consumptionData?.categoryHistoryResponseList.map((data, index) => (
            <View key={data.id}>
              {index === 0 ||
              formattedDate(data.dateTime) !==
                formattedDate(
                  consumptionData?.categoryHistoryResponseList[index - 1]
                    .dateTime
                ) ? (
                // 날짜가 바뀌면 날짜 표시
                <View style={index === 0 ? null : styles.listDateView}>
                  <Text>{formattedDateDayOfTheWeek(data.dateTime)}</Text>
                  <View style={styles.horizontalLine}></View>
                </View>
              ) : null}
              <ConsumptionList consumptionData={data} />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    zIndex: 1,
  },
  subContainer: {
    width: width * 0.9,
    flex: 1,
  },
  headerTitleText: {
    fontSize: 30,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  headerDateView: {
    width: width * 0.3,
    alignSelf: 'flex-end',
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: 'white',
    top: 20,
    zIndex: 2,
  },
  // headerAccountView: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  listScrollView: {
    marginTop: 20,
  },
  listDateView: {
    marginTop: 20,
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginVertical: 5,
  },
});
export default ConsumptionScreen;
