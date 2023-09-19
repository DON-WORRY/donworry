import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface ScreenProps {
  navigation: {
    goBack: (screen: string, params?: any) => void;
  };
}

const width = Dimensions.get('screen').width;

const data = [
  { card: '국민카드', day: 20230919, category: '식비', name: '신쭈꾸미 수완점', money: 32000 },
  { card: '국민카드', day: 20230919, category: '쇼핑', name: '신세계백화점 아디다스',  money: 198000 },
  { card: '국민카드', day: 20230919, category: '교통', name: '카카오 택시',  money: 6300 },
  { card: '국민카드', day: 20230919, category: '식비', name: '버거킹',  money: 11000 },
  { card: '국민카드', day: 20230918, category: '취미', name: 'Riot 게임즈',  money: 20000 },
  { card: '국민카드', day: 20230918, category: '식비', name: '한솥 도시락 수완점', money: 9000 },
  { card: '국민카드', day: 20230918, category: '쇼핑', name: '무신사',  money: 45000 },
  { card: '국민카드', day: 20230917, category: '교통', name: '코레일',  money: 33200 },
  { card: '국민카드', day: 20230917, category: '식비', name: '컴포즈 커피',  money: 4000 },
  { card: '국민카드', day: 20230917, category: '취미', name: 'Riot 게임즈',  money: 15000 },
  { card: '국민카드', day: 20230917, category: '식비', name: 'GS 25', money: 9000 },
  { card: '국민카드', day: 20230916, category: '기타', name: '네이버페이',  money: 50000 },
  { card: '국민카드', day: 20230916, category: '교통', name: '코레일',  money: 33200 },
  { card: '국민카드', day: 20230916, category: '식비', name: '스타벅스',  money: 14800 },
  { card: '국민카드', day: 20230915, category: '취미', name: 'Smilgate',  money: 55000 },
  { card: '국민카드', day: 20230915, category: '식비', name: '신쭈꾸미 수완점', money: 32000 },
  { card: '국민카드', day: 20230914, category: '기타', name: '카카오페이',  money: 10000 },
  { card: '국민카드', day: 20230914, category: '교통', name: '카카오 택시',  money: 8700 },
  { card: '국민카드', day: 20230914, category: '식비', name: '나주 곰탕',  money: 12000 },
  { card: '국민카드', day: 20230913, category: '식비', name: '벌크 커피',  money: 2500 },
];

const HistoryScreen: React.FC = () => {
  const blackLogo = require('../../assets/logo/BlackLogo.png');
  const navigation = useNavigation<ScreenProps['navigation']>();
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          onPress={() => {
            navigation.goBack('TabNavigation', { screen: 'Friend' });
          }}
        />
        <Image source={blackLogo} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.headerText}>친구 요청 및 수신</Text>
      </View>
        <ScrollView>
      <View>
        <Text style={styles.subTitle}>요청 메시지</Text>
        <View style={styles.line}></View>
          {data.map((item, index) => {
            return (
              <View key={index}>

              </View>
            );
          })}
      </View>
        </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    height: 40,
    width: 40,
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
  
  line: {
    height: 0,
    width: width * 0.85,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
  },
});

export default HistoryScreen;
