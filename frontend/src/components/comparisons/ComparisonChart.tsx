import React from 'react';
import { View } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryPolarAxis,
  VictoryTheme,
  VictoryLabel,
  VictoryArea,
} from 'victory-native';

const RadarChartExample: React.FC = () => {
  const adjustLabelPosition = (angle: number, distance: number) => {
    // 각도를 라디안으로 변환합니다.
    const radians = (angle / 180) * Math.PI;

    // 각도에 따라 x와 y 방향으로 이동할 값을 계산합니다.
    const dx = 20 * Math.cos(radians);
    const dy = 20 * Math.sin(radians);

    return { dx, dy };
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <VictoryChart
        polar
        theme={VictoryTheme.material}
        domain={{ y: [0, 5] }}
        startAngle={30}
        endAngle={390}
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
              style={[{ fontSize: 25 }]}
              dx={(d) => adjustLabelPosition(d.angle, 20).dx}
              dy={(d) => adjustLabelPosition(d.angle, 20).dy}
            />
          }
        />

        <VictoryArea
          data={data}
          style={{
            data: { fill: 'rgba(0, 0, 255, 0.5)' },
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
            data: { fill: 'rgba(255, 0, 0, 0.5)' },
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

export default RadarChartExample;
