import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';

/*
public class CategoryAmountResponse {
    private Long food;
    private Long transport;
    private Long life;
    private Long hobby;
    private Long style;
    private Long etc;
}
*/

const screenWidth = Dimensions.get('screen').width;

type CategoryAmountList = CategoryAmount[];

type CategoryAmount = {
  amount: number;
  category: string;
};

interface FriendSpendChartProps {
  myAmount: CategoryAmountList;
  kingsAmount: CategoryAmountList;
}
const indexList = [0, 1, 2, 3, 4, 5];
const FriendSpendChart: React.FC<FriendSpendChartProps> = (props) => {
  const [myAmount, setMyAmount] = useState<CategoryAmountList>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetch() {
      const nowAmount = props.myAmount;
      setMyAmount(nowAmount);
      setLoading(true);
    }
    fetch();
  }, [props.myAmount, props.kingsAmount]);
  return (
    <View>
      {myAmount.length > 0 ? (
        indexList.map((indexNumber: number) => {
          const cName = myAmount[indexNumber].category;
          return (
            <View key={indexNumber} style={styles.lineBox}>
              <View style={styles.leftStickBox}>
                <Text style={styles.amountLeftText}>{myAmount[indexNumber].amount}</Text>
                <View style={styles.leftStickTop}></View>
                <View style={styles.leftStickBottom}></View>
              </View>
              <View style={styles.categoryBox}>
                <View style={styles.category}>
                  <Text style={styles.categoryText}>{cName}</Text>
                </View>
              </View>
              <View style={styles.rightStickBox}>
                <Text style={styles.amountRightText}>{myAmount[indexNumber].amount}</Text>
                <View style={styles.rightStickTop}></View>
                <View style={styles.rightStickBottom}>
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lineBox: {
    width: screenWidth - 80,
    height: 40,
    flexDirection: 'row',
  },
  categoryBox: {
    width: 70,
    height: 40,
    padding: 5,
  },
  category: {
    width: 60,
    height: 30,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  categoryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  //   left stick
  leftStickTop: {
    backgroundColor: '#ADADF8',
    height: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingRight: 5,
  },
  leftStickBottom: {
    height: 10,
    backgroundColor: '#7777F3',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  leftStickBox: {
    height: 40,
    width: (screenWidth - 150) / 2,
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
  //   right stick
  rightStickTop: {
    height: 10,
    backgroundColor: '#FFE766',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingRight: 5,
  },
  rightStickBottom: {
    height: 10,
    backgroundColor: '#FFD700',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  rightStickBox: {
    height: 40,
    width: (screenWidth - 150) / 2,
    justifyContent: 'center',
    alignContent: 'flex-start',
  },
  amountLeftText: {
    right: 5, // marginRight 대신에 right를 사용
    position: 'absolute',
    zIndex: 999999999,
    // color: 'white',
    fontWeight: 'bold',
  },
  amountRightText: {
    marginLeft: 5,
    position: 'absolute',
    zIndex: 999999999,
    fontWeight: 'bold',
  },
});

export default FriendSpendChart;
