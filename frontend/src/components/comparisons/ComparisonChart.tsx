import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryPolarAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryArea,
} from 'victory-native';

const screenWidth = Dimensions.get('screen').width;
type TotalDataPropsType = {
  categoryName: string;
  myValue: number;
  friendsValue: number;
};

type TotalDataType = {
  totalData: TotalDataPropsType[];
};

interface ComparisonProps {
  totalData: TotalDataType;
}

const RadarChartExample: React.FC<ComparisonProps> = (props) => {
  const adjustLabelPosition = (
    x: number | undefined,
    y: number | undefined,
    distance: number
  ) => {
    const centerX = screenWidth / 2;
    const centerY = 175;
    if (x != undefined) {
      const tmp = centerX - x;
      if (-10 < tmp && tmp < 10) {
        if (y != undefined) {
          if (y > centerY) {
            return { dx: 0, dy: distance };
          } else {
            return { dx: 0, dy: -distance };
          }
        }
      } else if (x > centerX && y != undefined && y > centerY) {
        return { dx: distance / 2, dy: distance / 2 };
      } else if (x < centerX && y != undefined && y > centerY) {
        return { dx: -distance / 2, dy: distance / 2 };
      } else if (x < centerX && y != undefined && y < centerY) {
        return { dx: -distance / 2, dy: -distance / 2 };
      } else if (x > centerX && y != undefined && y < centerY) {
        return { dx: distance / 2, dy: -distance / 2 };
      } else {
        return { dx: 0, dy: 0 };
      }
    }
    return { dx: 0, dy: 0 };
  };

  const data = [
    { x: 0, y: 2 },
    { x: 60, y: 3 },
    { x: 120, y: 5 },
    { x: 180, y: 1 },
    { x: 240, y: 4 },
    { x: 300, y: 2 },
  ];

  const data2 = [
    { x: 0, y: 5 },
    { x: 60, y: 4 },
    { x: 120, y: 2 },
    { x: 180, y: 3 },
    { x: 240, y: 1 },
    { x: 300, y: 5 },
  ];

  return (
    <View style={styles.container}>
      <VictoryChart
        polar
        theme={VictoryTheme.material}
        domain={{ y: [0, 5] }}
        startAngle={30}
        endAngle={390}
        // height={screenWidth * 0.9}
        // width={screenWidth * 0.9}
      >
        <VictoryPolarAxis
          dependentAxis
          theme={VictoryTheme.material}
          style={{
            axis: { stroke: 'none' },
            ticks: { stroke: 'black' },
            tickLabels: { fill: 'transparent' },
            grid: { stroke: 'black' },
          }}
        />

        <VictoryPolarAxis
          labelPlacement="vertical"
          tickValues={[0, 60, 120, 180, 240, 300]}
          tickFormat={['식비', '교통', '생활', '의류', '유흥', '기타']}
          style={{
            axis: { stroke: 'black' },
            ticks: { stroke: 'black' },
            tickLabels: { fill: 'black' },
            grid: { stroke: 'black' },
          }}
          tickLabelComponent={
            <VictoryLabel
              style={[{ fontSize: 16 }]}
              dx={(d) => adjustLabelPosition(d.x, d.y, 20).dx}
              dy={(d) => adjustLabelPosition(d.x, d.y, 20).dy}
            />
          }
        />

        <VictoryArea
          data={data}
          style={{
            data: { fill: 'rgba(119, 119, 243, 0.5)' },
          }}
        />
        <VictoryLine
          data={data}
          style={{
            data: { stroke: 'blue' },
          }}
        />

        <VictoryArea
          data={data2}
          style={{
            data: { fill: 'rgba(246, 148, 150, 0.5)' },
          }}
        />
        <VictoryLine
          data={data2}
          style={{
            data: { stroke: 'red' },
          }}
        />
      </VictoryChart>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenWidth * 0.9,
    width: screenWidth * 0.9,
  },
});

export default RadarChartExample;
