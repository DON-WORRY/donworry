import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type friendType = {
  friendId: number;
  friendName: string;
  friendEmail: string;
};

interface FriendListItemProps {
  friend: friendType;
}

type RootStackParamList = {
  FriendDetail: {
    friendPk: string;
  };
  // 다른 화면들의 파라미터 정의도 여기에 추가
};

const FriendListItem: React.FC<FriendListItemProps> = (props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'FriendDetail'>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        Alert.alert(
          `${props.friend.friendName}`,
          '해당 친구와 비교를 원하시나요?',
          [
            {
              text: '비교하러 가기',
              onPress: () => {
                navigation.navigate('FriendDetail', {
                  friendPk: `${props.friend.friendId}`,
                });
              },
            },
            { text: '취소하기', onPress: () => {} },
          ]
        )
      }
    >
      <Text style={[styles.text]}>{props.friend.friendName}</Text>
      <Text style={[styles.text]}>
        {props.friend.friendEmail.slice(0, 8) + '...'}
      </Text>
    </TouchableOpacity>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    width: screenWidth - 80,
    height: 60,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default FriendListItem;
