import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import ContentBox from '../../components/ContentBox';
import ComponentsHeader from '../../components/ComponentsHeader';
import HomeSpend from '../../components/homes/HomeSpend';
import HomeCardSpend from '../../components/homes/HomeCardSpend';
import { RouteProp } from '@react-navigation/native';
import { RootTabParamList } from '../../navigations/RootNavigator/Tab';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

interface SpendScreenProps {
  route: RouteProp<RootTabParamList, 'Spend'>;
}

const screenWidth = Dimensions.get('screen').width;

const SpendScreen: React.FC<SpendScreenProps> = ({ route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigation = useNavigation<ScreenProps['navigation']>();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    // 각 컴포넌트를 새로고침하게 만들기 위해 refreshKey 값을 변경
    setRefreshKey((prevKey) => prevKey + 1);

    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (route.params?.refresh) {
      onRefresh();
    }
  }, [route.params?.refresh]);

  return (
    <View style={styles.container}>
      <ComponentsHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableOpacity
          style={styles.listView}
          onPress={() => {
            navigation.navigate('StackNavigation', { screen: 'DutchpayState' });
          }}
        >
          <Text style={styles.listText}>더치페이 현황</Text>
          <FontAwesome name="angle-right" size={40} />
        </TouchableOpacity>
        <ContentBox>
          <HomeSpend refreshKey={refreshKey} />
        </ContentBox>
        <ContentBox>
          <HomeCardSpend refreshKey={refreshKey} />
        </ContentBox>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingLeft: 20,
    width: screenWidth - 40,
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  listText: {
    width: screenWidth - 100,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SpendScreen;
