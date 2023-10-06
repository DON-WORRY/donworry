import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  VirtualizedList,
  RefreshControl
} from 'react-native';

import ComponentsHeader from '../../components/ComponentsHeader';
import FriendMessageComponent from '../../components/friends/FriendMessageComponent';
import FriendSpendKing from '../../components/friends/FriendSpendKing';
import FriendList from '../../components/friends/FriendList';
import LoaderModal from '../../components/modals/NewModal';

const FriendScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // 각 컴포넌트를 새로고침하게 만들기 위해 refreshKey 값을 변경
    setRefreshKey((prevKey) => prevKey + 1);

    setRefreshing(false);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalVisible(false);
    }, 600);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [refreshKey]);

  return (
    <View style={styles.container}>
      {isModalVisible ? (
        <LoaderModal />
      ) : (
        <>
          <ComponentsHeader />
          <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <FriendMessageComponent />
            <FriendList refreshKey={refreshKey} />
            <FriendSpendKing refreshKey={refreshKey} />
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FriendScreen;
