import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { newMessages } from '../../utils/UserFunctions';
import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { notificationUpdate } from '../../utils/NotificationFunctions';

type RootStackParamList = {
  Home: undefined;
  Spend: undefined;
  Asset: undefined;
  Comparison: undefined;
  Friend: undefined;
};

interface NotificationItemProps {
  item: {
    notificationContent: string;
    notificationId: number;
  };
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  let icon;
  let page = '';
  const navigation = useNavigation<ScreenProps['navigation']>();
  if (item.notificationContent.includes('더치페이')) {
    icon = (
      <FontAwesome
        style={styles.iconStyle}
        name="credit-card"
        size={24}
        color="#6EB7F9"
      />
    );
    page = 'DutchpayState';
  } else if (item.notificationContent.includes('친구가')) {
    icon = (
      <FontAwesome
        style={styles.iconStyle}
        name="plus"
        size={24}
        color="#7777F3"
      />
    );
    page = 'Message';
  } else if (item.notificationContent.includes('받음')) {
    icon = (
      <FontAwesome
        style={styles.iconStyle}
        name="money"
        size={24}
        color="green"
      />
    );
    page = 'Asset';
  } else if (item.notificationContent.includes('친구요청')) {
    icon = (
      <FontAwesome
        style={styles.iconStyle}
        name="paper-plane"
        size={24}
        color="#BA6EF9"
      />
    );
    page = 'Message';
  }

  // 일단 읽음 처리해야됨
  async function clickHandle(itemId: number, page: string) {
    await notificationUpdate(itemId)
      .then((r) => {
        console.log('실행');
        console.log(r);
      })
      .catch((e) => {
        console.error(e);
      });
    if (page === 'Asset') {
      const newNavigation =
        useNavigation<StackNavigationProp<RootStackParamList, 'Asset'>>();
      newNavigation.replace('Asset');
    } else {
      navigation.replace('StackNavigation', { screen: page });
    }
    // 해당 페이지로 보내버려
    // navigation.navigate('StackNavigation', { screen: 'Message' });
    // asset으로 이동할 때
    // navigation.navigate('Asset')
    // const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Asset'>>();
  }

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        clickHandle(item.notificationId, page);
      }}
    >
      {icon}
      <Text style={styles.itemText}>{item.notificationContent}</Text>
    </TouchableOpacity>
  );
};

type MessageType = {
  notificationContent: string;
  notificationId: number;
  notificationStatus: string;
  notificationType: string;
};

interface ScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
    replace: (screen: string, params?: any) => void;
  };
}
const blackLogo = require('../../assets/logo/BlackLogo.png');

const NewMessageScreen: React.FC = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  const [messageData, setMessageData] = useState<MessageType[]>([]);
  useEffect(() => {
    async function fetch() {
      const tmpData = await newMessages()
        .then((r) => {
          return r.data.data.notificationHistoryResponseList;
        })
        .catch((e) => {
          console.error(e);
        });
      await setMessageData(tmpData);
    }
    fetch();
  }, [messageData.length]);
  return (
    <View style={styles.container}>
      <View style={styles.header_box}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
        <Image source={blackLogo} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.header_text}>내소식</Text>
      </View>
      <FlatList
        style={styles.flatListContainer}
        keyExtractor={(item) => item.notificationId.toString()}
        data={messageData}
        renderItem={(items) => <NotificationItem item={items.item} />}
      />
    </View>
  );
};

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'light-gray',
  },
  logo: {
    height: 40,
    width: 40,
  },
  header_box: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth - 40,
  },
  header_text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  flatListContainer: {
    height: screenHeight * 0.8,
    width: screenWidth - 40,
  },
  itemContainer: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 18,
    marginBottom: 8,
  },
  iconStyle: {
    marginRight: 10,
  },
});

export default NewMessageScreen;
