import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { friendCheck } from '../../utils/FriendFunctions';
import SelectDropdown from 'react-native-select-dropdown';

interface FriendResponseProps {
  email: string;
  name: string;
  time: string;
  friendRequestId: number;
  memberId: number;
  setRendering: (render: boolean) => void;
}

// type FriendCheckdata = {
//   isAccept: boolean;
//   friendRequestId: number;
//   friendId: number;
// };

const FriendResponse: React.FC<FriendResponseProps> = (props) => {
  function cancelHandle() {
    const data = {
      isAccept: false,
      friendRequestId: props.friendRequestId,
      friendId: props.memberId,
    }
    // console.log(data.friendRequestId)
    // console.log(data.friendId)
    friendCheck(data).then((r) => {
      // console.log(r)
      props.setRendering(false)
    }).catch((e) => {
      console.error(e)
    })
    console.log('cancel');
  }
  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <View style={styles.topIconEmailBox}>
          <FontAwesome name="paper-plane" style={styles.icon} size={20} />
          <Text style={styles.topText}>{props.email}</Text>
        </View>
        <Text style={styles.topText}>{props.time}</Text>
      </View>
      <View style={styles.bottomBox}>
        <View style={styles.textBox}>
          <Text style={styles.nameText}>{props.name}</Text>
          <Text> 님께 친구 요청을 보냈습니다.</Text>
        </View>
        <View>
          {/* 버튼 */}
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => {
              cancelHandle();
            }}
          >
            <Text style={styles.btnText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: 'white',
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
  },
  icon: {
    color: '#0000FF',
    marginRight: 10,
  },
  topBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomBox: {
    paddingLeft: 5,
    paddingRight: 5,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topIconEmailBox: {
    flexDirection: 'row',
  },
  topText: {
    fontSize: 16,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cancelBtn: {
    height: 30,
    width: 60,
    borderRadius: 5,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default FriendResponse;
