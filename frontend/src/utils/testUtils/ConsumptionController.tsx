import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  consumptionCategoryTotal,
  consumptionCategoryHistory,
  consumptionCategoryModify,
} from '../ConsumptionFunctions';

const ConsumptionController: React.FC = () => {
  // 카테고리별 소비내역 조회
  // consumptionCategoryHistory(12)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //   });

  // // ============================== 다시 점검해야함 =================================
  // 카테고리별 소비합계 실행할것.
  // consumptionCategoryTotal(2)
  //   .then((res) => {
  //     console.log(res.data.categoryAmountList);
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //   });
  // {"code": "OK", "data": {"categoryAmountList": [[Object], [Object], [Object], [Object], [Object], [Object]], "total": 0}, "status": 200}
  function testHandle() {
    console.log('==========consumption=========');
    // consumptionCategoryTotal(2)
    // .then((res) => {
    //   console.log(res.data.categoryAmountList);
    // })
    // .catch((e) => {
    //   console.error(e);
    // });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        testHandle();
      }}
    >
      <Text style={styles.text}>ConsumptionController</Text>
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
export default ConsumptionController;
