import React from 'react';
import { View, StyleSheet } from 'react-native';
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


const AssetChart = () => {
  // inputData 배열에 각 달의 데이터를 저장합니다.
  const inputData = [
    { x: 202309, y: 420000 },
    { x: 202308, y: 350000 },
    { x: 202307, y: 450000 },
    { x: 202306, y: 520000 },
    { x: 202305, y: 300000 },
  ];

  // 첫번째 월을 찾아서 currentMonth 변수에 저장합니다.
  const currentMonth = inputData[0].x % 100;

  // 데이터가 없는 달도 포함하여 최근 12개월의 데이터를 준비합니다.
  const dataBar = Array.from({ length: 12 }, (_, index) => {
    let month = (currentMonth - index) % 12;
    month = month <= 0 ? 12 + month : month;

    const yearAdjustment = month > currentMonth ? -1 : 0;
    const year = Math.floor(inputData[0].x / 100) + yearAdjustment;
    
    const yearMonth = parseInt(`${year}${String(month).padStart(2, '0')}`, 10);
    const existingData = inputData.find((data) => data.x === yearMonth);
    
    return existingData || { x: yearMonth, y: 0 };
  });


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

  return (
    // 차트의 외부 뷰를 설정합니다.
    <View
      style={{
        margin: 10,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
      }}
    >
      <View style={{ padding: 20, alignItems: 'center' }}>
        {/* VictoryChart 컴포넌트를 사용하여 차트를 생성합니다. */}
        <VictoryChart
          theme={VictoryTheme.material}

          containerComponent={<VictoryVoronoiContainer />}
        >
          {/* X축 설정입니다. tickFormat 함수는 x 값을 받아 월 라벨을 반환합니다. */}
          <VictoryAxis
            tickFormat={(x) => {
              const month = x % 100;
              console.log(month)
              return monthLabels[month - 1];
            }}
            style={{
              axis: { stroke: 'transparent' },
              ticks: { stroke: 'lightgray' },
              tickLabels: { fill: 'lightgray', fontSize: 12 },
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
            labels={({ datum }: { datum: Data }) => `y: ${datum.y}`}
            labelComponent={<VictoryTooltip renderInPortal={false} />}
          />
          {/* 스캐터 차트를 생성합니다. 각 데이터 포인트에 툴팁 레이블을 추가합니다. */}
          <VictoryScatter
            data={dataBar}
            size={5}
            style={{ data: { fill: '#000000' } }}
            labels={({ datum }: { datum: Data }) => `y: ${datum.y}`}
            labelComponent={<VictoryTooltip renderInPortal={false} />}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

export default AssetChart;
