import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HomeAsset from '../../components/homes/HomeAsset';
import HomeSpend from '../../components/homes/HomeSpend';
import HomeCardSpend from '../../components/homes/HomeCardSpend';
import ContentBox from '../../components/ContentBox';
import ComponentsHeader from '../../components/ComponentsHeader';

const HomeScreen: React.FC = () => {
  return (
      <View style={styles.container}>
        <ComponentsHeader />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        alwaysBounceHorizontal={true}
        >
          <ContentBox>
            <HomeAsset />
          </ContentBox>
          <ContentBox>
            <HomeSpend />
          </ContentBox>
          <ContentBox>
            <HomeCardSpend />
          </ContentBox>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  scrollViewContainer: {
    alignItems: 'center',
  },
});

export default HomeScreen;
