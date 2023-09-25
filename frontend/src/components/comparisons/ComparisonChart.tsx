import React, { useState, useEffect } from 'react';
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
  const [maxValue, setMaxValue] = useState(5);

  useEffect(() => {
    const tmpMaxValue = Math.max(
      props.totalData.totalData[0].myValue,
      props.totalData.totalData[1].myValue,
      props.totalData.totalData[2].myValue,
      props.totalData.totalData[3].myValue,
      props.totalData.totalData[4].myValue,
      props.totalData.totalData[5].myValue,
      props.totalData.totalData[0].friendsValue,
      props.totalData.totalData[1].friendsValue,
      props.totalData.totalData[2].friendsValue,
      props.totalData.totalData[3].friendsValue,
      props.totalData.totalData[4].friendsValue,
      props.totalData.totalData[5].friendsValue
    );
    setMaxValue(tmpMaxValue);
    console.log(tmpMaxValue);
  }, [props.totalData]);

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
    { x: 0, y: props.totalData.totalData[0].myValue },
    { x: 60, y: props.totalData.totalData[1].myValue },
    { x: 120, y: props.totalData.totalData[2].myValue },
    { x: 180, y: props.totalData.totalData[3].myValue },
    { x: 240, y: props.totalData.totalData[4].myValue },
    { x: 300, y: props.totalData.totalData[5].myValue },
  ];

  const data2 = [
    { x: 0, y: props.totalData.totalData[0].friendsValue },
    { x: 60, y: props.totalData.totalData[1].friendsValue },
    { x: 120, y: props.totalData.totalData[2].friendsValue },
    { x: 180, y: props.totalData.totalData[3].friendsValue },
    { x: 240, y: props.totalData.totalData[4].friendsValue },
    { x: 300, y: props.totalData.totalData[5].friendsValue },
  ];

  return (
    <View style={styles.container}>
      <VictoryChart
        polar
        theme={VictoryTheme.material}
        domain={{ y: [0, maxValue ? maxValue + maxValue * 0.1 : 10] }}
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
          tickFormat={[
            props.totalData.totalData[0].categoryName,
            props.totalData.totalData[1].categoryName,
            props.totalData.totalData[2].categoryName,
            props.totalData.totalData[3].categoryName,
            props.totalData.totalData[4].categoryName,
            props.totalData.totalData[5].categoryName,
          ]}
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
