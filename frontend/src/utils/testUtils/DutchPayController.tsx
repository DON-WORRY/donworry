import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  consumptionDutchPayInquiry,
  consumptionDutchPayRequest,
  consumptionDutchPayComplete,
  consumptionDutchPayAllComplete,
} from '../ConsumptionFunctions';

const DutchPayController: React.FC = () => {
  function testHandle() {
    // 더치페이 조회
    // consumptionDutchPayInquiry()
    //   .then((r) => {
    //     console.log(r);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // res data
    //     {"code": "OK", "data": [{"dutchpayReceivedPrice": 3, "dutchpayReqPrice": 10, "dutchpayStatus": "COMPLETE", "id": 3, "name": "김동
    // 현"}], "status": 200}
    //  LOG  {"code": "OK", "data": [{"dutchpayReceivedPrice": 3, "dutchpayReqPrice": 10, "dutchpayStatus": "COMPLETE", "id": 3, "name": "김동
    // 현"}], "status": 200}
    // ========================================
    // ========================================
    // 더치페이 요청
    // // type DutchPayRequestData = {
    //     //   id: number;
    //     //   reqAmountList: [
    //     //     {
    //     //       memberId: number;
    //     //       price: number;
    //     //     },
    //     //   ];
    //     // };
    //     const data = {
    //       consumptionId: 2,
    //       friendId: 2,
    //       price: 50000,
    //     };
    //     consumptionDutchPayRequest(data)
    //       .then((r) => {
    //         console.log(r);
    //       })
    //       .catch((e) => {
    //         console.error(e);
    //       });
    // res
    // {"code": "OK", "data": [{"dutchpayReceivedPrice": 3, "dutchpayReqPrice": 10, "dutchpayStatus": "COMPLETE", "id": 1, "name": "김동현"}], "status": 200}
    // ========================================
    // ========================================
    // 더치페이 완료
    // export async function consumptionDutchPayComplete(
    //   dutchPayId: number,
    //   friendId: number
    // )
    // consumptionDutchPayComplete(1, 3)
    // .then((r) => {
    //   console.log(r);
    // })
    // .catch((e) => {
    //   console.error(e);
    // });
    // LOG  =========dutchpay=========
    // LOG  ok
    // LOG  200
    // ========================================
    // ========================================
    // 더치페이 전체완료 id : 더치페이 아이디
    // export async function consumptionDutchPayAllComplete(
    //   id: number
    // )
    // consumptionDutchPayAllComplete(1)
    //   .then((r) => {
    //     console.log(r);
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // LOG  =========dutchpay=========
    // LOG  ok
    // LOG  200
    // ========================================
    // ========================================
    console.log('=========dutchpay=========');
    consumptionDutchPayComplete(1, 3)
      .then((r) => {
        console.log(r);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        testHandle();
      }}
    >
      <Text style={styles.text}>DutchPayController</Text>
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

export default DutchPayController;
