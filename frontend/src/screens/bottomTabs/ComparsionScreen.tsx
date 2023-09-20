import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import ComponentsHeader from '../../components/ComponentsHeader';
import ComparisonHeader from '../../components/comparisons/ComparisonHeader';
import ComparisonChart from '../../components/comparisons/ComparisonChart';
import ComparisonBar from '../../components/comparisons/ComparisonBar';

const myData: {
  [keyName: string]: number;
} = {
  food: 296000,
  transport: 100000,
  hobby: 90000,
  life: 800000,
  etc: 72000,
  style: 220000,
};

const friendData: {
  [keyName: string]: number;
} = {
  food: 370000,
  transport: 200000,
  hobby: 50000,
  life: 1000000,
  etc: 400000,
  style: 178000,
};

const categoryName: {
  [keyName: string]: string;
} = {
  food: '식비',
  transport: '교통',
  hobby: '취미',
  life: '가사',
  etc: '기타',
  style: '의류',
};

const modeKey = ['food', 'transport', 'hobby', 'life', 'style', 'etc'];

const ComparisonScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ComponentsHeader />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        alwaysBounceHorizontal={true}
      >
      <ComparisonHeader />
        <ComparisonChart />
        {modeKey.map((keyName) => {
          return (
            <View key={keyName}>
              <ComparisonBar
                categoryName={categoryName[keyName]}
                myValue={myData[keyName]}
                friendsValue={friendData[keyName]}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

// const screenWidth = Dimensions.get('screen').width;
// const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRignt: 20,
    paddingBottom: 80,
  },
  scrollView: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default ComparisonScreen;
