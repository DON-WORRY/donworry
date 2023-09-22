import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');
const money = 8200000;
const goal = 8000000;
const progress = (money / goal) * 100;

const AssetGoal: React.FC = () => {
  const [barContainerWidth, setBarContainerWidth] = useState(0);

  return (
    <View style={styles.container}>
      <View style={[styles.row, { marginBottom: width * 0.04 }]}>
        <Text style={styles.headText}>자산</Text>
        <View style={styles.rightSection}>
          <Text>설정</Text>
          <MaterialIcons
            style={styles.icon}
            name="arrow-forward-ios"
            color={'grey'}
            size={width * 0.06}
          />
        </View>
      </View>

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
              (Math.min(progress, 91) / 100) * barContainerWidth - width * 0.05,
          }}
          name="directions-run"
          size={width * 0.1}
        />
      </View>
      <View style={styles.runnerIconContainer}>
        <MaterialIcons
          style={{
            ...styles.runnerIcon,
            left: barContainerWidth - width * 0.065,
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
      <View style={[styles.row, styles.money, { marginBottom: width * 0.04 }]}>
        <Text>0원</Text>
        <View style={styles.rightSection}>
          <Text>800만원</Text>
        </View>
      </View>

      <View style={[styles.row, styles.bottom]}>
        <Text style={styles.headText}>현재 자산</Text>
        <View style={styles.rightSection}>
          <Text style={{ fontWeight: 'bold', fontSize: width * 0.04 }}>
            5,490,528원
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
    top: width * 0.185, // 이 값을 조정하여 아이콘의 위치를 위로 올리거나 내릴 수 있습니다
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
