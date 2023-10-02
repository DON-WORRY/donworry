import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { newMessages } from '../../utils/UserFunctions';

interface ScreenProps {
  navigation: {
    goBack: () => void;
  };
}
const blackLogo = require('../../assets/logo/BlackLogo.png');

const NewMessageScreen: React.FC = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  const [messageData, setMessageData] = useState();
  useEffect(() => {
    async function fetch() {
      const tmpData = await newMessages()
        .then((r) => {
          return r.data.data.notificationHistoryResponseList;
        })
        .catch((e) => {
          console.error(e);
        });
        console.log(tmpData)
    }
    fetch()
  });
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
});

export default NewMessageScreen;
