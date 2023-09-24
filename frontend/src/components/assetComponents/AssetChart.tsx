import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { accountPerMonthAsset } from '../../utils/AccountFunctions';

interface Data {
  x: number;
  y: number;
}
interface AssetChartProps {
  refreshKey: number;
}

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // 읽기 에러
    console.error(e);
    throw e;
  }
};

const { width } = Dimensions.get('screen');

const formatAmount = (amount: string): string => {
  return parseInt(amount, 10).toLocaleString('ko-KR') + '원';
};

const AssetChart: React.FC<AssetChartProps> = (props) => {
  const [userName, setUserName] = useState('');
  const [monthAmount, setMonthAmount] = useState(0);
  const [dataBar, setDataBar] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const newUserName = await getData('memberName');
        const newMonthAmount: any = await accountPerMonthAsset();
        const newDataBar = newMonthAmount.data.map(
          (item: { time: string; accountAmount: number }) => {
            const month = parseInt(item.time.slice(5, 7), 10); // 6-7번 문자열을 추출
            return { x: month, y: item.accountAmount };
          }
        );
        if (newUserName) {
          setUserName(newUserName);
        }

        setMonthAmount(newMonthAmount.data[11].accountAmount);
        setDataBar(newDataBar); // Here
      } catch (error) {
        console.error('에러:', error);
      }
    };
    fetch();
  }, [props.refreshKey]);

  return (
    <View
      style={{
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Text style={styles.nameText}>{userName} 님의 순자산</Text>
      <Text style={styles.moneyText}>
        {formatAmount(monthAmount.toString())}
      </Text>
      <View style={{ alignItems: 'center' }}>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={<VictoryVoronoiContainer />}
          height={width * 0.65}
        >
          <VictoryAxis
            tickValues={dataBar.map((_, index) => index + 1)}
            tickFormat={(index) =>
              dataBar[index - 1] ? `${dataBar[index - 1].x}월` : ''
            }
            style={{
              axis: { stroke: 'transparent' },
              grid: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
              tickLabels: { fill: 'black', fontSize: 12 },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${x / 1000}k`}
            style={{
              axis: { stroke: 'transparent' },
              grid: { stroke: 'transparent' },
              ticks: { stroke: 'transparent' },
              tickLabels: { fill: 'transparent' },
            }}
          />
          <VictoryBar
            data={dataBar.map((item, index) => ({ x: index + 1, y: item.y }))}
            x="x"
            y="y"
            style={{
              data: {
                fill: ({ datum }) => (datum.y > 400000 ? '#006DFF' : '#3BE9DE'),
                height: ({ datum }) => datum.y * 0.8,
              },
            }}
            barWidth={16}
          />
          <VictoryLine
            data={dataBar.map((item, index) => ({ x: index + 1, y: item.y }))}
            style={{
              data: { stroke: '#000000', strokeWidth: 3 },
            }}
          />
          <VictoryScatter
            data={dataBar.map((item, index) => ({
              originalX: item.x,
              x: index + 1,
              y: item.y,
            }))}
            size={5}
            style={{
              data: {
                fill: 'white',
                stroke: '#000000',
                strokeWidth: 3,
              },
            }}
            labels={({
              datum,
            }: {
              datum: { originalX: number; x: number; y: number };
            }) => `${datum.originalX}월: ${formatAmount(datum.y.toString())}`}
            labelComponent={
              <VictoryTooltip
                renderInPortal={false}
                style={{ fill: '#ffffff', fontSize: width * 0.03 }}
                flyoutStyle={{
                  stroke: '#000000',
                  fill: '#1f1f1f',
                  strokeWidth: 5,
                }}
              />
            }
          />
        </VictoryChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  moneyText: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
  },
});

export default AssetChart;
