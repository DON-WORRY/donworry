import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

interface ComparisonBarProps {
  categoryName: string;
  myValue: number;
  friendsValue: number;
}

const screenWidth = Dimensions.get('screen').width;
const totalBarWidth = screenWidth - 60;
const ComaprisonBar: React.FC<ComparisonBarProps> = (props) => {
  if (props.myValue <= props.friendsValue) {
    const smallBarWidth = props.friendsValue === 0 ? 0 : totalBarWidth * (props.myValue / props.friendsValue);
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
          <Text style={styles.valueText}>{props.friendsValue}원</Text>
        </View>
        <View style={innerStyles.totalBar}>
          <View style={innerStyles.smallBar}>
            <Text style={styles.innerText}>{props.myValue}원</Text>
          </View>
        </View>
      </View>
    );
  } else {
    const smallBarWidth = props.myValue === 0 ? 0 : totalBarWidth * (props.friendsValue / props.myValue);
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
          <Text style={styles.valueText}>{props.myValue}원</Text>
        </View>
        <View style={innerStyles.totalBar}>
          <View style={innerStyles.smallBar}>
            <Text style={styles.innerText}>{props.friendsValue}원</Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    height: 100,
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
    alignItems: "flex-end"
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ComaprisonBar;
