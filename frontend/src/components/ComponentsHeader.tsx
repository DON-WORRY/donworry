import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setMypageModal } from '../store/Modal';
import EventSource, { EventSourceListener } from 'react-native-sse';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DrawerProps = {
  navigation: {
    openDrawer: () => void;
  };
};

interface ComponentsHeaderProps {
  mainOpen?: boolean
}

const donWorryHeader = require('../assets/logo/DONWORRYCOLOR.png');
const screenWidth = Dimensions.get('screen').width;

const ComponentsHeader: React.FC<ComponentsHeaderProps> = ({ mainOpen }) => {
  const navigation = useNavigation<DrawerProps['navigation']>();
  const dispatch = useDispatch();
  const [myId, setMyId] = useState('');
  const [myToken, setMyToken] = useState('');

  useEffect(() => {
    // if (mainOpen) {
    //   console.log("안녕")
    // }
    async function fetchMyData() {
      try {
        const data = await AsyncStorage.multiGet(['memberId', 'accessToken']);
        setMyId(data[0][1] || "");
        setMyToken(data[1][1] || "");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchMyData();
  }, []);
  useEffect(() => {
    let es: EventSource;
    if (myId && myToken) {
      console.log('실행은 했는지');
      es = new EventSource(
        `https://j9c210.p.ssafy.io/api/notifications/subscribe/${myId}`,
        {
          headers: {
            Authorization: {
              toString: function () {
                return 'Bearer ' + myToken;
              },
            },
          },
          debug: true,
        }
      );

      const listener: EventSourceListener = (event) => {
        if (event.type === 'open') {
          console.log('Open SSE connection.', event);
        } else if (event.type === 'message') {
          console.log('message', event);
        } else if (event.type === 'error') {
          console.error('Connection error:', event);
        } else if (event.type === 'exception') {
          console.error('Error:', event);
        }
      };
      if (mainOpen) {
        console.log('OPEN');
        es.addEventListener('open', listener);
      }
      console.log('MESSAGE');
      es.addEventListener('message', listener);
      console.log('ERROR');
      es.addEventListener('error', listener);
    }
    if (mainOpen) {
      return () => {
        if (es) es.close();
      };
    }
  }, [myId, myToken, mainOpen]);

  function handleMenuClick() {
    dispatch(setMypageModal(false));
    navigation.openDrawer();
  }
  return (
    <View style={styles.header}>
      <Image
        source={donWorryHeader}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={handleMenuClick}>
        <FontAwesome name="bars" size={30} color={'#808080'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: screenWidth - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    height: screenWidth * 0.08,
    width: screenWidth * 0.4,
  },
});

export default ComponentsHeader;
