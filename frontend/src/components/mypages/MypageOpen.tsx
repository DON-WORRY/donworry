import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, Image } from 'react-native';
import MypageImage from './MypageImage';
import MypageText from './MypageText';
import MypageButton from './MyPageButton';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import { userLogout } from '../../utils/UserFunctions';

type UserData = {
  memberId: string;
  memberEmail: string;
  memberName: string;
  memberBirthDate: string;
};
interface MyPageOpenProps {
  data: UserData;
}

const MypageOpen: React.FC<MyPageOpenProps> = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.data.memberName}님의 정보</Text>
      <MypageImage style={styles.image} />
      <View style={styles.info_View}>
        <MypageText title="이름" content={props.data.memberName} />
        <MypageText title="생년월일" content={props.data.memberBirthDate} />
        <MypageText title="이메일" content={props.data.memberEmail} />
      </View>
      <View style={styles.info_Button}>
        {/* <MypageButton
          title="수정하기"
          onPress={() => console.log('수정')}
          color="#7777F3"
        /> */}
        <MypageButton
          title="로그아웃"
          onPress={() => {
            userLogout();
            navigation.dispatch(DrawerActions.closeDrawer());
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'StackNavigation', // 외부 내비게이터 이름
                    state: {
                      index: 0,
                      routes: [
                        { name: 'Login' }, // 중첩된 내비게이터에서의 라우트
                      ],
                    },
                  },
                ],
              })
            );
          }}
          color="#FF0000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 60,
    height: 500,
  },
  text: {
    fontSize: 35,
    fontWeight: '800',
    paddingRight: 30,
  },
  image: {
    borderRadius: 50,
    height: 100,
    width: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  info_View: {
    width: Dimensions.get('screen').width * 0.6,
  },
  info_Button: {
    width: Dimensions.get('screen').width * 0.4,
    marginTop: 20,
  },
});

export default MypageOpen;
