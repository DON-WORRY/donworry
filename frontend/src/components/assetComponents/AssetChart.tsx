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
  // inputData 배열에 각 달의 데이터를 저장합니다.
  const inputData = [
    { x: 202309, y: 420000 },
    { x: 202308, y: 350000 },
    { x: 202307, y: 450000 },
    { x: 202306, y: 520000 },
    { x: 202305, y: 300000 },
  ];

  // 한글 월 라벨 배열
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

  // inputData의 첫 번째 월을 찾습니다. (202309에서 09를 찾습니다)
  const firstMonth = parseInt(inputData[0].x.toString().slice(-2), 10) - 1;

  const dataBar = Array.from({ length: 12 }, (_, index) => {
    const existingData = inputData[index];

    return existingData
      ? { x: 12 - index, y: existingData.y }
      : { x: 12 - index, y: 0 };
  });

  return (
    // 차트의 외부 뷰를 설정합니다.
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
        {/* VictoryChart 컴포넌트를 사용하여 차트를 생성합니다. */}
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={<VictoryVoronoiContainer />}
          height= {width * 0.8}
        >
          {/* X축 설정입니다. tickFormat 함수는 x 값을 받아 월 라벨을 반환합니다. */}
          <VictoryAxis
            tickFormat={(x) => monthLabels[(x + firstMonth) % 12]}
            style={{
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'lightgray' },
              tickLabels: { fill: 'black', fontSize: 12 },
            }}
          />

          {/* Y축 설정입니다. tickFormat 함수는 y 값을 받아 천 단위로 변환하여 반환합니다. */}
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${x / 1000}k`}
            style={{
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'lightgray' },
              tickLabels: { fill: 'transparent' },
            }}
          />
          {/* 바 차트를 생성합니다. 각 데이터 포인트의 y 값에 따라 다른 색상을 사용합니다. */}
          <VictoryBar
            data={dataBar}
            x="x"
            y="y"
            style={{
              data: {
                fill: ({ datum }) => (datum.y > 400000 ? '#006DFF' : '#3BE9DE'),
                height: ({ datum }) => datum.y * 0.8, // 바 차트 높이를 조절
              },
            }}
            barWidth={16}
          />
          {/* 라인 차트를 생성합니다. 각 데이터 포인트에 레이블을 추가합니다. */}
          <VictoryLine
            data={dataBar}
            style={{
              data: { stroke: '#000000', strokeWidth: 3 },
            }}
          />
          {/* 스캐터 차트를 생성합니다. 각 데이터 포인트에 툴팁 레이블을 추가합니다. */}
          <VictoryScatter
            data={dataBar}
            size={5}
            style={{
              data: {
                fill: '#FFFFFF', // 흰색 점
                stroke: '#000000', // 검정 테두리
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
