import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MypageImage from './MypageImage';
import { useDispatch } from 'react-redux';
import { setMypageModal } from '../../store/Modal';
type UserData = {
  memberId: string;
  memberEmail: string;
  memberName: string;
  memberBirthDate: string;
};
interface MyPageCloseProps {
  data: UserData;
}

const MyPageClose: React.FC<MyPageCloseProps> = (props) => {
  const dispatch = useDispatch();
  function handleDownClick() {
    dispatch(setMypageModal(true));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_view}>
        <View style={styles.profile_view}>
          <MypageImage style={styles.profile_image} />
        </View>
        <View style={styles.text_view}>
          <Text style={styles.text_name}>{props.data.memberName}</Text>
          <Text style={styles.text_email}>{props.data.memberEmail}</Text>
        </View>
        <View style={styles.icon_view}>
          <TouchableOpacity onPress={handleDownClick}>
            <Image
              source={require('../../assets/user/Down.png')}
              style={styles.down_image}
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  header_view: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  profile_view: {
    padding: 5,
  },
  profile_image: {
    height: 55,
    width: 55,
  },
  text_view: {
    marginLeft: 10,
    padding: 7,
    justifyContent: 'space-between',
  },
  text_name: {
    fontSize: 25,
    fontWeight: '600',
  },
  text_email: {
    fontSize: 15,
  },
  icon_view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  down_image: {
    height: 30,
    width: 30,
  },
});

export default MyPageClose;
