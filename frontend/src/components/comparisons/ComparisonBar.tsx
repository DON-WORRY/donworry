import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

interface ComparisonBarProps {
  categoryName: string;
  myValue: number;
  friendsValue: number;
}

const screenWidth = Dimensions.get('screen').width;
const totalBarWidth = screenWidth - 60;
const ComaprisonBar: React.FC<ComparisonBarProps> = (props) => {
  const [myValue, setMyValue] = useState('');
  const [friendValue, setFriendValue] = useState('');
  const [amountDifference, setAmountDifference] = useState('');
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function fetch() {
      await setMyValue(numberWithCommas(props.myValue));
      await setFriendValue(numberWithCommas(props.friendsValue));
      await setAmountDifference(numberWithCommas(props.myValue - props.friendsValue));
    }
    fetch()
  }, [props.friendsValue, props.myValue]);
  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if (props.myValue <= props.friendsValue) {
    const smallBarWidth =
      props.friendsValue === 0
        ? 0
        : totalBarWidth * (props.myValue / props.friendsValue);
    const innerStyles = StyleSheet.create({
      smallBar: {
        width: smallBarWidth,
        height: 30,
        borderRadius: 10,
        backgroundColor: '#7777F3',
        paddingLeft: 10,
        justifyContent: 'center',
      },
      totalBar: {
        width: totalBarWidth,
        height: 30,
        backgroundColor: '#F69496',
        borderRadius: 10,
        marginTop: 10,
      },
    });
    return (
      <View style={styles.container}>
        <View style={styles.smallContainer}>
          <Text style={styles.titleText}>{props.categoryName}</Text>
          <Text style={styles.valueText}>{friendValue}원</Text>
        </View>
        <View style={innerStyles.totalBar}>
          <View style={innerStyles.smallBar}>
            <Text style={styles.innerText}>{myValue}원</Text>
          </View>
          <Text style={styles.amountDifference}>
            소비한 금액 차이 : {amountDifference}
          </Text>
        </View>
      </View>
    );
  } else {
    const smallBarWidth =
      props.myValue === 0
        ? 0
        : totalBarWidth * (props.friendsValue / props.myValue);
    const innerStyles = StyleSheet.create({
      smallBar: {
        width: smallBarWidth,
        height: 30,
        borderRadius: 10,
        backgroundColor: '#F69496',
        paddingLeft: 10,
        justifyContent: 'center',
      },
      totalBar: {
        marginTop: 10,
        width: totalBarWidth,
        height: 30,
        backgroundColor: '#7777F3',
        borderRadius: 10,
      },
    });
    return (
      <View style={styles.container}>
        <View style={styles.smallContainer}>
          <Text style={styles.titleText}>{props.categoryName}</Text>
          <Text style={styles.valueText}>{myValue}원</Text>
        </View>
        <View style={innerStyles.totalBar}>
          <View style={innerStyles.smallBar}>
            <Text style={styles.innerText}>{friendValue}원</Text>
          </View>
          <Text style={styles.amountDifference}>
            소비한 금액 차이 : {amountDifference}원
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    height: 130,
    width: screenWidth - 40,
    marginBottom: 10,
    borderRadius: 15,
  },
  titleText: {
    fontWeight: '900',
    fontSize: 24,
  },
  innerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    width: 100,
  },
  smallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  amountDifference: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ComaprisonBar;
