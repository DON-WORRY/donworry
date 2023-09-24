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
  accountSetGoal,
  accountGoalInquiry,
  accountSearchAccountList,
} from '../../utils/AccountFunctions';

interface AssetGoalProps {
  refreshKey: number;
}

const { width } = Dimensions.get('screen');

const AssetGoal: React.FC<AssetGoalProps> = (props) => {
  const { refreshKey } = props;
  const [barContainerWidth, setBarContainerWidth] = useState(0);

  const [goalAmount, setGoalAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [progress, setProgress] = useState(0);

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
      } catch (error) {
        console.log('error: ', error);
      }
    };
    fetch();
  }, [refreshKey]);

  const SetGoal = async () => {
    const newGoal = 39999999;
    const nowTime = new Date().toISOString();

    const year = nowTime.substring(0, 4);
    const month = nowTime.substring(5, 7);
    const rest = nowTime.substring(7);

    const newMonth = String(parseInt(month, 10) + 1).padStart(2, '0');
    const endTime = `${year}-${newMonth}${rest}`;

    const data = {
      goalAmount: newGoal,
      goalStartTime: nowTime,
      goalEndTime: endTime,
    };

    try {
      await accountSetGoal(data);
      setGoalAmount(newGoal);
      setProgress(totalAmount / newGoal * 100)
    } catch (e) {
      console.error('Failed to set goal:', e);
    }
  };

  const formatAmount = (amount: number) => {
    if (amount < 10000) {
      return `${amount}원`;
    }
    
    // 뒤의 4자리를 없애기
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
        <Text style={styles.headText}>자산</Text>
        <TouchableOpacity
          onPress={() => {
            SetGoal();
          }}
        >
          <View style={styles.rightSection}>
            <Text>설정</Text>
            <MaterialIcons
              style={styles.icon}
              name="arrow-forward-ios"
              color={'grey'}
              size={width * 0.06}
            />
          </View>
        </TouchableOpacity>
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
                    width * 0.17,
                  alignItems: 'center',
                }}
              >
                <View style={[styles.triangle, { left: width * 0.1 }]} />
                <View style={styles.balloon}>
                  <Text style={styles.balloonText}>{progress.toFixed(1)}%</Text>
                </View>
              </View>
            )}
            <MaterialIcons
              style={{
                ...styles.runnerIcon,
                left:
                  (Math.min(progress, 91) / 100) * barContainerWidth -
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
              color={'red'}
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
                { width: `${progress}%`, backgroundColor: '#c43a31' },
              ]}
            />
            <View
              style={[
                styles.bar,
                {
                  width: `${100 - progress}%`,
                  backgroundColor: 'grey',
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
            120일 남음
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
  icon: {
    marginLeft: 8,
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
    backgroundColor: 'pink',
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
    borderBottomColor: 'pink',
    transform: [{ rotate: '90deg' }],
  },
});

export default AssetGoal;
