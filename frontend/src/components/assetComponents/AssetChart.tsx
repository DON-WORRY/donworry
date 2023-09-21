import React from 'react';
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

interface Data {
  x: number;
  y: number;
}

const { width } = Dimensions.get('screen');

const AssetChart = () => {
  const inputData = [
    { x: 202310, y: 480000 },
    { x: 202309, y: 420000 },
    { x: 202308, y: 350000 },
    { x: 202307, y: 450000 },
    { x: 202306, y: 520000 },
    { x: 202305, y: 300000 },
  ];

  const monthLabels = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const firstMonth = parseInt(inputData[0].x.toString().slice(-2), 10) - 1;

  const dataBar = Array.from({ length: 12 }, (_, index) => {
    const existingData = inputData[index];

    return existingData
      ? { x: 12 - index, y: existingData.y }
      : { x: 12 - index, y: 0 };
  });

  return (
    <View
      style={{
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Text style={styles.nameText}>OOO님의 순자산</Text>
      <Text style={styles.moneyText}>5,490,528원</Text>
      <View style={{ alignItems: 'center' }}>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={<VictoryVoronoiContainer />}
          height={width * 0.65}
        >
          <VictoryAxis
            tickFormat={(x) => monthLabels[(x + firstMonth) % 12]}
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
            data={dataBar}
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
            data={dataBar}
            style={{
              data: { stroke: '#000000', strokeWidth: 3 },
            }}
          />
          <VictoryScatter
            data={dataBar}
            size={5}
            style={{
              data: {
                fill: 'white',
                stroke: '#000000',
                strokeWidth: 3,
              },
            }}
            labels={({ datum }: { datum: Data }) => `y: ${datum.y}`}
            labelComponent={
              <VictoryTooltip
                renderInPortal={false}
                style={{ fill: '#ffffff', fontSize: 12 }}
                flyoutStyle={{ stroke: '#000000', fill: '#1f1f1f', strokeWidth: 1 }}
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
  },
  moneyText: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
  },
});

export default AssetChart;
