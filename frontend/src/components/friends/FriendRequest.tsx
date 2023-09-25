import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { friendCheck } from '../../utils/FriendFunctions';

interface FriendRequestProps {
  email: string;
  name: string;
  time: string;
  friendRequestId: number;
  memberId: number;
  setRendering: (render: boolean) => void;
}

const FriendRequest: React.FC<FriendRequestProps> = (props) => {
  function accessHandle() {
    const accessData = {
      isAccept: true,
      friendRequestId: props.friendRequestId,
      friendId: props.memberId,
    };
    console.log(accessData.friendId);
    console.log(accessData.friendRequestId);
    friendCheck(accessData)
      .then((r) => {
        props.setRendering(false);
      })
      .catch((e) => {
        console.error(e);
      });
    console.log('access');
  }

  function cancelHandle() {
    const cancelData = {
      isAccept: true,
      friendRequestId: props.friendRequestId,
      friendId: props.memberId,
    };
    friendCheck(cancelData)
      .then((r) => {
        console.log(r);
        props.setRendering(false);
      })
      .catch((e) => {
        console.error(e);
      });

    console.log('cancel');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <View style={styles.topIconEmailBox}>
          <FontAwesome name="user-plus" style={styles.icon} size={20} />
          <Text style={styles.topText}>{props.email}</Text>
        </View>
        <Text style={styles.topText}>{props.time.slice(0,10)}</Text>
      </View>
      <View style={styles.bottomBox}>
        <View style={styles.textBox}>
          <Text style={styles.nameText}>{props.name}</Text>
        </View>
        <View style={styles.btnBox}>
          {/* 버튼 */}
          <TouchableOpacity
            style={styles.accessBtn}
            onPress={() => {
              accessHandle();
            }}
          >
            <Text style={styles.btnText}>수락</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => {
              cancelHandle();
            }}
          >
            <Text style={styles.btnText}>거절</Text>
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
    color: '#59D58A',
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
  accessBtn: {
    height: 30,
    width: 60,
    borderRadius: 5,
    backgroundColor: '#7777F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
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
  btnBox: {
    flexDirection: 'row',
  },
});

export default FriendRequest;
