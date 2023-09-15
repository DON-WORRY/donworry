import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AssetAsset from '../../components/assetComponents/AssetAsset';
import AssetChart from '../../components/assetComponents/AssetChart';
import ContentBox from '../../components/ContentBox';
import ComponentsHeader from '../../components/ComponentsHeader';

function AssetScreen() {
  return (
    <View style={styles.container}>
      <ComponentsHeader />
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <ContentBox>
          <AssetAsset />
        </ContentBox>
        <ContentBox>
          <AssetChart />
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
