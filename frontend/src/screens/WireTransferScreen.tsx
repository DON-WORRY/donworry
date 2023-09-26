import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BackHeader from '../components/BackHeader';
import { RouteProp } from '@react-navigation/core';
import { images } from '../assets/bank&card';

const width = Dimensions.get('screen').width;

type RootStackParamList = {
  WireTransfer: {
    accounts: Array<any>;
    accountId: number;
  };
};
type WireTransferRouteProp = RouteProp<RootStackParamList, 'WireTransfer'>;

interface WireTransferProps {
  route: WireTransferRouteProp;
}
const WireTranferScreen: React.FC<WireTransferProps> = ({ route }) => {
  const { accounts = [], accountId } = route.params || {};
  const filteredAccounts = accounts.filter(
    (account) => account.accountId !== accountId
  );

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BackHeader screen="Asset" />
        <View style={styles.dcontainer}>
          <TextInput
            style={styles.textInput}
            placeholder="계좌번호 입력"
            keyboardType="numeric"
          />
          <Text>내 계좌 보기</Text>
          {filteredAccounts.map((account, index) => (
            <View key={index} style={styles.row}>
              <Image
                style={styles.imageStyle}
                source={images[account.bankName]}
              />
              <View style={{ marginLeft: width * 0.05 }}>
                <Text style={styles.bankName}>{account.bankName}</Text>
                <Text style={styles.accountNumber}>
                  {account.accountNumber}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: 'white',
    width: '100%',
  },
  dcontainer: {
    marginTop: width * 0.1,
    flex: 1,
    alignItems: 'center',
    width: '90%',
  },
  imageStyle: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: (width * 0.13) / 2,
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: width * 0.02,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  bankName: {
    fontSize: 16,
  },
  accountNumber: {
    fontSize: 14,
    color: '#7f7f7f',
  },
  textInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    marginBottom: width * 0.1,
  },
});

export default WireTranferScreen;
