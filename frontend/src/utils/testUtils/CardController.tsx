import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  accountCardHistory,
  accountCardDetail,
  accountCardList,
} from '../AccountFunctions';
const CardController: React.FC = () => {
  function testHandle() {
    // 카드별 소비 내역
    // accountCardHistory().then((res) =>
    // console.log(res))
    // .catch((e) => {
    //   console.error(e)
    // })
    // res
    // {"code": "OK", "data": null, "status": 200}
    // ==============================================
    // ==============================================
    // 상세카드 소비내역
    // accountCardDetail(1)
    //   .then((res) => console.log(res))
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // ==============================================
    // ==============================================
    // 사용자 카드 불러오기
    // accountCardList()
    //   .then((res) => console.log(res))
    //   .catch((e) => {
    //     console.error(e);
    //   });

    console.log('========card========');
    // accountCardList()
    //   .then((res) => console.log(res))
    //   .catch((e) => {
    //     console.error(e);
    //   });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        testHandle();
      }}
    >
      <Text style={styles.text}>CardController</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 200,
    backgroundColor: '#7777F3',
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CardController;
