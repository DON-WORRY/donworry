import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import ComparisonChart from '../../components/comparisons/ComparisonChart';
import ComparisonBar from '../../components/comparisons/ComparisonBar';

const ComparisonScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ComparisonChart />
        <ComparisonBar />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRignt: 20,
  },
});

export default ComparisonScreen;
