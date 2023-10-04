import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  VirtualizedList,
} from 'react-native';

import ComponentsHeader from '../../components/ComponentsHeader';
import FriendMessageComponent from '../../components/friends/FriendMessageComponent';
import FriendSpendKing from '../../components/friends/FriendSpendKing';
import FriendList from '../../components/friends/FriendList';
import LoaderModal from '../../components/modals/NewModal';

const FriendScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalVisible(false);
    }, 600);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

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
          >
            <FriendMessageComponent />
            <FriendSpendKing />
            <FriendList />
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
