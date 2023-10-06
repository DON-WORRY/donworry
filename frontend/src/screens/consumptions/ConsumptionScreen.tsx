import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import BackHeader from '../../components/BackHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { consumptionCategoryHistory } from '../../utils/ConsumptionFunctions';
import ConsumptionList from '../../components/consumptions/ConsumptionList';
import { SelectList } from 'react-native-dropdown-select-list';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigations/RootNavigator/Stack';
import { RouteProp } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import LoaderModal from '../../components/modals/LoaderModal';

const categoryData = [
  { key: '0', value: '전체' },
  { key: '1', value: '교통' },
  { key: '2', value: '생활' },
  { key: '3', value: '식비' },
  { key: '4', value: '쇼핑' },
  { key: '5', value: '여가' },
  { key: '6', value: '기타' },
];

// interface ScreenProps {
//   navigation: {
//     navigate: (screen: string, params?: any) => void;
//   };
// }

interface ConsumptionDataProps {
  bankName: string;
  detail: string;
  price: number;
  dateTime: string;
  id: number;
  dutchpayStatus: 'NOTSTART' | 'PROGRESS' | 'COMPLETE';
  categoryId: number;
}

interface ConsumptionResponseProps {
  categoryHistoryResponseList: ConsumptionDataProps[];
  total: any;
}

interface ConsumptionScreenProps {
  route: RouteProp<RootStackParamList, 'Consumption'>;
}

const ConsumptionScreen: React.FC<ConsumptionScreenProps> = ({ route }) => {
  const [consumptionData, setConSumptionData] =
    useState<ConsumptionResponseProps>();
  categoryData;
  const [category, setCategory] = useState<number>(
    route.params ? route.params.categoryId : 0
  );
  // 현재 날짜 반환
  const currentDate = new Date();
  const initialMonth = currentDate.getMonth() + 1;
  const [month, setMonth] = useState<number>(
    route.params ? route.params.month : initialMonth
  );
  const [isLoading, setIsLoading] = useState(true);
  // const navigation = useNavigation<ScreenProps['navigation']>();

  useEffect(() => {
    async function fetchData(category: number, month: number) {
      try {
        const response = await consumptionCategoryHistory(category, month);
        if (response) {
          setConSumptionData({
            categoryHistoryResponseList: response.categoryHistoryResponseList,
            total: response.total,
          });
          console.log(response.categoryHistoryResponseList);
        } else {
          console.error('API response does not contain data.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
    // 비동기 작업을 수행하는 함수 내에서 await 사용
    async function loadData() {
      await setIsLoading(true);
      await fetchData(category, month);
      setIsLoading(false);
    }
    loadData();
  }, [category, month]);

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

  function handleGoToLeft() {
    if (month > 1) {
      setMonth(month - 1);
    }
  }

  function handleGoToRight() {
    if (month < initialMonth) {
      setMonth(month + 1);
    }
  }

  return isLoading ? (
    <LoaderModal />
  ) : (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BackHeader screen="Spend" />
        <View style={styles.subContainer}>
          <Text style={styles.headerTitleText}>소비</Text>
          <View style={styles.headerCategoryView}>
            <SelectList
              setSelected={(val: number) => {
                setCategory(val);
              }}
              data={categoryData}
              save="key"
              search={false}
              boxStyles={{ borderRadius: 10 }}
              defaultOption={{
                key: category,
                value: categoryData[category].value,
              }}
            />
          </View>
          <View style={styles.headerMiddleView}>
            <View style={styles.headerDateView}>
              <TouchableOpacity onPress={handleGoToLeft}>
                <AntDesign name="caretleft" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerDateText}>{month}월</Text>
              <TouchableOpacity
                onPress={handleGoToRight}
                disabled={month === initialMonth ? true : false}
              >
                <AntDesign
                  name="caretright"
                  size={24}
                  color={month === initialMonth ? 'lightgray' : 'black'}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerPriceText}>
              지출 : {formattedPrice(consumptionData?.total)}원
            </Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.listScrollView}
          >
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
                    <Text style={styles.dateText}>
                      {formattedDateDayOfTheWeek(data.dateTime)}
                    </Text>
                    <View style={styles.horizontalLine}></View>
                  </View>
                ) : null}
                <ConsumptionList consumptionData={data} month={month} />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 60,
  },
  subContainer: {
    width: width * 0.9,
    flex: 1,
  },
  headerTitleText: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  headerMiddleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerDateView: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 5,
  },
  headerDateText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerCategoryView: {
    width: width * 0.23,
    alignSelf: 'flex-end',
    position: 'absolute',
    borderRadius: 10,
    top: 10,
    backgroundColor:"white",
    zIndex: 1,
  },
  headerPriceText: {
    alignSelf: 'flex-end',
    fontSize: width * 0.06,
    fontWeight: 'bold',
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
  dateText: {
    paddingVertical: 5,
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  horizontalLine: {
    borderBottomColor: '#7777F3',
    borderBottomWidth: 2,
    marginVertical: 5,
  },
});
export default ConsumptionScreen;
