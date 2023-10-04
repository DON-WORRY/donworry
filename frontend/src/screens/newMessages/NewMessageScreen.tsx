import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { newMessages } from '../../utils/UserFunctions';
import { FontAwesome } from '@expo/vector-icons';
import { notificationUpdate } from '../../utils/NotificationFunctions';

interface NotificationItemProps {
  item: {
    notificationContent: string;
    notificationId: number;
  };
  setIsChanged : (isChanged: boolean) => void
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item, setIsChanged }) => {
  let icon;
  if (item.notificationContent.includes('더치페이')) {
    icon = (
      <FontAwesome
        style={styles.iconStyle}
        name="credit-card"
        size={24}
        color="#6EB7F9"
      />
    );
  } else if (item.notificationContent.includes('친구가')) {
    icon = (
      <FontAwesome
        style={styles.iconStyle}
        name="plus"
        size={24}
        color="#7777F3"
      />
    );
  } else if (item.notificationContent.includes('받음')) {
    icon = (
      <FontAwesome
        style={styles.iconStyle}
        name="money"
        size={24}
        color="green"
      />
    );
  } else if (item.notificationContent.includes('친구요청')) {
    icon = (
      <FontAwesome
        style={styles.iconStyle}
        name="paper-plane"
        size={24}
        color="#BA6EF9"
      />
    );
  } else if (item.notificationContent.includes('정산')) {
    icon = (
      <FontAwesome
        style={styles.iconStyle}
        name="calculator"
        size={24}
        color="black"
      />
    );
  }

  // 일단 읽음 처리해야됨
  async function clickHandle(itemId: number) {
    await notificationUpdate(itemId)
      .then((r) => {
        console.log('읽음');
        console.log(r);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  async function WantYouRead(itemId: number) {
    Alert.alert(
      '알림', // 제목
      '확인하시겠습니까?', // 내용
      [
        {
          text: '확인', // 취소 버튼 텍스트
          onPress: async () => {
            await clickHandle(itemId)
            await setIsChanged(true)
          }
        },
        {
          text: '취소', // 확인 버튼 텍스트
        },
      ],
      { cancelable: false } // 뒤로가기 버튼으로 경고창을 닫지 못하게 함
    );
  }

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        WantYouRead(item.notificationId);
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
  const [isChanged, setIsChanged] = useState(true)
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
      await setIsChanged(false)
    }
    fetch();
  }, [messageData.length, isChanged === true]);
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
        renderItem={(items) => <NotificationItem item={items.item} setIsChanged={setIsChanged}/>}
      />
      {/* <NotificationItem
        item={{
          notificationContent: '정산',
          notificationId: 1,
        }}
      /> */}
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
