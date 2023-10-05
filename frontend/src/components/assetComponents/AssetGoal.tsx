import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  accountGoalInquiry,
  accountSearchAccountList,
} from '../../utils/AccountFunctions';
import AssetSetGoal from '../../components/assetComponents/child/AssetSetGoal';

interface AssetGoalProps {
  refreshKey: number;
}

const { width } = Dimensions.get('screen');

const AssetGoal: React.FC<AssetGoalProps> = (props) => {
  const [barContainerWidth, setBarContainerWidth] = useState(0);
  const [goalAmount, setGoalAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [remainDate, setRemainDate] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const newGoalAmount: any = await accountGoalInquiry();
        const newTotalAmount: any = await accountSearchAccountList();

        setTotalAmount(newTotalAmount.data.total);
        if (newGoalAmount.data === null) {
          setGoalAmount(newGoalAmount.data);
        } else {
          setGoalAmount(newGoalAmount.data.goalAmount);
          setProgress(
            (newTotalAmount.data.total / newGoalAmount.data.goalAmount) * 100
          );
        }
        setRemainDate(
          calculateRemainingDays(
            newGoalAmount.data.goalStartTime,
            newGoalAmount.data.goalEndTime
          )
        );
      } catch (error) {
        console.log('error: ', error);
      }
    };
    fetch();
  }, [props.refreshKey, remainDate]);

  const updateRemainDate = (newRemainDate: number) => {
    setRemainDate(newRemainDate);
  };

  const calculateRemainingDays = (startDate: string, endDate: string) => {
    // 문자열 날짜를 Date 객체로 변환
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const formatAmount = (amount: number) => {
    if (amount < 10000) {
      return `${amount}원`;
    }
    const chkAmount = Math.floor(amount / 10000) * 10000;
    let truncatedAmount = chkAmount;
    const units = ['', '만', '억', '조'];
    let formattedStr = '';

    for (const unit of units) {
      const part = truncatedAmount % 10000;
      if (part !== 0) {
        formattedStr = `${part}${unit} ` + formattedStr;
      }
      truncatedAmount = Math.floor(truncatedAmount / 10000);
      if (truncatedAmount === 0) {
        break;
      }
    }
    return formattedStr.trim() + '원';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, { marginBottom: width * 0.04, width: '105%' }]}>
        <Text style={styles.headText}>목표</Text>
        <AssetSetGoal updateRemainDate={updateRemainDate} />
      </View>

      {goalAmount !== null && (
        <View style={[{ width: '100%' }]}>
          <View style={styles.runnerIconContainer}>
            {progress >= 20 && (
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  left:
                    (Math.min(progress, 90) / 100) * barContainerWidth -
                    width * 0.2,
                  alignItems: 'center',
                }}
              >
                <View style={[styles.triangle, { left: width * 0.1 }]} />
                <View style={styles.balloon}>
                  <Text style={styles.balloonText}>
                    {progress > 100 ? ' 달성완료 ' : `${progress.toFixed(1)}%`}
                  </Text>
                </View>
              </View>
            )}
            <MaterialIcons
              style={{
                ...styles.runnerIcon,
                left:
                  (Math.min(progress, 89) / 100) * barContainerWidth -
                  width * 0.05,
              }}
              name="directions-run"
              size={width * 0.1}
            />
          </View>
          <View style={styles.runnerIconContainer}>
            <MaterialIcons
              style={{
                ...styles.runnerIcon,
                left: barContainerWidth - width * 0.075,
              }}
              name="outlined-flag"
              color={'#7777F3'}
              size={width * 0.1}
            />
          </View>

          <View
            style={[styles.barContainer, { marginTop: width * 0.12 }]}
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              setBarContainerWidth(width);
            }}
          >
            <View
              style={[
                styles.bar,
                { width: `${progress}%`, backgroundColor: '#7777F3' },
              ]}
            />
            <View
              style={[
                styles.bar,
                {
                  width: `${100 - progress}%`,
                  backgroundColor: 'lightgrey',
                  position: 'absolute',
                  left: `${progress}%`,
                },
              ]}
            />
          </View>
          <View
            style={[styles.row, styles.money, { marginBottom: width * 0.04 }]}
          >
            <Text>0원</Text>
            <View style={styles.rightSection}>
              <Text>{formatAmount(goalAmount)}</Text>
            </View>
          </View>
        </View>
      )}

      <View style={[styles.row, styles.bottom]}>
        <Text style={styles.headText}>현재 자산</Text>
        <View style={styles.rightSection}>
          <Text style={{ fontWeight: 'bold', fontSize: width * 0.04 }}>
            {formatAmount(totalAmount)}
          </Text>
        </View>
      </View>
      <View style={[styles.row, styles.bottom]}>
        <Text style={styles.headText}>도전 기간</Text>
        <View style={styles.rightSection}>
          <Text style={{ fontWeight: 'bold', fontSize: width * 0.04 }}>
            {remainDate <= 0 ? '기간만료' : `${remainDate}일 남음`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barContainer: {
    flexDirection: 'row',
    width: '105%',
    height: width * 0.1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'grey',
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft: '-2.5%',
    marginRight: '-2.5%',
    padding: 0,
  },
  bar: {
    height: '100%',
  },
  runnerIconContainer: {
    position: 'absolute',
    top: width * 0.065, // 이 값을 조정하여 아이콘의 위치를 위로 올리거나 내릴 수 있습니다
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  runnerIcon: {
    position: 'absolute',
  },
  bottom: {
    marginTop: width * 0.02,
  },
  money: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '106%',
    marginLeft: -width * 0.02,
  },
  balloon: {
    position: 'absolute',
    backgroundColor: '#EBDDF7',
    borderRadius: 10,
    padding: 5,
    zIndex: 1, // 말풍선을 아이콘 위에 표시합니다.
  },
  balloonText: {
    color: 'black',
    fontSize: 12,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#EBDDF7',
    transform: [{ rotate: '90deg' }],
  },
});

export default AssetGoal;
