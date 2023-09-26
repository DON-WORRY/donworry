import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import AssetAsset from '../../components/assetComponents/AssetAsset';
import AssetChart from '../../components/assetComponents/AssetChart';
import AssetGoal from '../../components/assetComponents/AssetGoal';
import ContentBox from '../../components/ContentBox';
import ComponentsHeader from '../../components/ComponentsHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function AssetScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // 각 컴포넌트를 새로고침하게 만들기 위해 refreshKey 값을 변경
    setRefreshKey((prevKey) => prevKey + 1);

    setRefreshing(false);
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <ComponentsHeader />
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ContentBox>
            <AssetAsset refreshKey={refreshKey} />
          </ContentBox>
          <ContentBox>
            <AssetChart refreshKey={refreshKey} />
          </ContentBox>
          <ContentBox>
            <AssetGoal refreshKey={refreshKey} />
          </ContentBox>
        </ScrollView>
      </View>
    </BottomSheetModalProvider>
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
