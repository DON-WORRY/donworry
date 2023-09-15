import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

type Amount = {
  food: number;
  transport: number;
  hobby: number;
  life: number;
  etc: number;
  style: number;
};

interface ComparisonChartProps {
  size: string;
  myAmount: Amount;
  friendAmount: Amount;
}

const ComparisonChart: React.FC<ComparisonChartProps> = (props) => {
  return (
    <View>
      <Svg width="200" height="200" viewBox="0 0 100 100">
        <Polygon
          points="50,1 95,25 95,75 50,99 5,75 5,25"
          fill="none"
          stroke="purple"
          strokeWidth="3"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ComparisonChart;
