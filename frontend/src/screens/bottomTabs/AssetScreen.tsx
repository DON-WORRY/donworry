import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import AssetAsset from '../../components/assetComponents/AssetAsset';
import AssetChart from '../../components/assetComponents/AssetChart';
import AssetGoal from '../../components/assetComponents/AssetGoal';
import ContentBox from '../../components/ContentBox';
import ComponentsHeader from '../../components/ComponentsHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { RouteProp } from '@react-navigation/native';
import { RootTabParamList } from '../../navigations/RootNavigator/Tab';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const expoConfig = Constants.expoConfig;
    const extra = expoConfig ? expoConfig.extra : null;
    token = await Notifications.getExpoPushTokenAsync({
      projectId: extra!.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

interface ConsumptionScreenProps {
  route: RouteProp<RootTabParamList, 'Asset'>;
}

const AssetScreen: React.FC<ConsumptionScreenProps> = ({ route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

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

  useEffect(() => {
    registerForPushNotificationsAsync();
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

export default AssetScreen;
