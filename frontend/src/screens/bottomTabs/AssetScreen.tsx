import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import HomeSpend from '../../components/homes/HomeSpend';
import AssetAsset from '../../components/assetComponents/AssetAsset'
import ContentBox from '../../components/ContentBox';
import ComponentsHeader from '../../components/ComponentsHeader';

function AssetScreen() {
  return (
    <View style={styles.container}>
      <ComponentsHeader />
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        alwaysBounceHorizontal={true}
      >
        <ContentBox>
          <AssetAsset />
        </ContentBox>
      </ScrollView>
    </View>
  );
}

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

export default AssetScreen;
