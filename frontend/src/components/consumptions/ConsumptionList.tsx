import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button } from '../../components/logins/Login';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../assets/bank&card';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const categoryDataByValue = ['교통', '생활', '식비', '쇼핑', '여가', '기타'];

const categoryData = [
  { key: '1', value: '교통' },
  { key: '2', value: '생활' },
  { key: '3', value: '식비' },
  { key: '4', value: '쇼핑' },
  { key: '5', value: '여가' },
  { key: '6', value: '기타' },
];

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

interface ConsumptionDataProps {
  consumptionData: {
    bankName: string;
    detail: string;
    price: number;
    dateTime: string;
    id: number;
    dutchpayStatus: 'NOTSTART' | 'PROGRESS' | 'COMPLETE';
  };
}

const ConsumptionList: React.FC<ConsumptionDataProps> = (props) => {
  // const blackLogo = require('../../assets/logo/BlackLogo.png');
  // const navigation = useNavigation<ScreenProps['navigation']>();
  const snapPoints = useMemo(() => ['35%'], []);
  const bottomSheetModalRef: React.RefObject<any> = useRef(null);
  const [categorySelected, setCategorySelected] = useState('');
  const navigation = useNavigation<ScreenProps['navigation']>();

  function formattedTime(inputDateTime: string) {
    const parsedDate = new Date(inputDateTime);
    // 시간 추출
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();

    // 시간을 두 자리 숫자로 포맷팅
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // 오전(AM) 또는 오후(PM) 추가
    const period = hours < 12 ? '오전' : '오후';

    // "HH:mm" 형식으로 반환
    return `${period} ${formattedHours}:${formattedMinutes}`;
  }

  function formattedDetail(inputDetail: string) {
    const maxLength = 10; // 최대 길이 설정
    if (inputDetail.length > maxLength) {
      return inputDetail.slice(0, maxLength) + '...'; // 10글자 초과 시 "..." 추가
    }
    return inputDetail; // 10글자 이하인 경우 그대로 반환
  }

  function formattedPrice(inputPrice: number) {
    const formatter = new Intl.NumberFormat('en-US').format(inputPrice);
    return formatter;
  }

  return (
    <>
      <TouchableOpacity
        style={styles.listContainer}
        onPress={() => {
          bottomSheetModalRef.current.dismiss();
          bottomSheetModalRef.current.present();
        }}
      >
        <View style={styles.listViewLeft}>
          <View style={styles.listLogoView}>
            <Image
              source={images[props.consumptionData.bankName]}
              style={styles.listLogo}
            />
          </View>
          <View style={styles.listTitleView}>
            <Text>{formattedDetail(props.consumptionData.detail)}</Text>
            <Text style={styles.listBankText}>
              {props.consumptionData.bankName}
            </Text>
          </View>
          <View style={styles.listTimeView}>
            <Text style={styles.listTimeText}>
              {formattedTime(props.consumptionData.dateTime)}
            </Text>
          </View>
        </View>
        <View style={styles.listViewRight}>
          <Text>-{formattedPrice(props.consumptionData.price)}원</Text>
        </View>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeaderView}>
            <View style={styles.modalHeaderTitleView}>
              <Image
                source={images[props.consumptionData.bankName]}
                style={styles.modalHeaderLogo}
              />
              <Text style={styles.modalHeaderTitle}>
                {props.consumptionData.detail}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.modalHeaderExit}
              onPress={() => bottomSheetModalRef.current.dismiss()}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalPriceView}>
            <Text style={styles.modalPriceText}>
              -{formattedPrice(props.consumptionData.price)}원
            </Text>
          </View>
          <View style={styles.modalCategoryView}>
            <View style={styles.modalCategoryTextView}>
              <Text style={styles.modalCategoryText}>카테고리</Text>
            </View>
            <View style={styles.modalCategorySelectView}>
              <SelectDropdown
                data={categoryDataByValue}
                // defaultValueByIndex={1}
                defaultValue={'교통'} // categoryData[props.consumptionData.categoryId ].value
                onSelect={(selectedItem, index) => {
                  // 이 때 카테고리 변경시키면 됨!!!!!
                  console.log(selectedItem, index);
                }}
                // defaultButtonText={'Select country'}
                // buttonTextAfterSelection={(selectedItem, index) => {
                //   console.log('selecteditem : ' + selectedItem);
                //   return selectedItem;
                // }}
                // rowTextForSelection={(item, index) => {
                //   return item;
                // }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#444'}
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
              />
            </View>
          </View>
          <Button
            title={
              props.consumptionData.dutchpayStatus === 'NOTSTART'
                ? '더치페이'
                : props.consumptionData.dutchpayStatus === 'PROGRESS'
                ? '더치페이진행중'
                : '더치페이완료'
            }
            onPress={() => {
              navigation.navigate('StackNavigation', {
                screen: 'DutchpayRequest',
                params: props.consumptionData,
              });
            }}
            disabled={
              props.consumptionData.dutchpayStatus === 'NOTSTART' ? false : true
            }
            widthPercentage={0.9}
          />
        </View>
      </BottomSheetModal>
    </>
  );
};

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listLogoView: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  listLogo: {
    height: 40,
    width: 40,
  },
  listTitleView: {
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  listBankText: {
    color: 'gray',
    fontSize: 10,
    marginTop: 2,
  },
  listTimeView: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  listTimeText: {
    fontSize: 9,
  },
  listViewLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listViewRight: {
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    flex: 1,
  },
  modalHeaderView: {
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'space-between',
  },
  modalHeaderTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalHeaderLogo: {
    height: 50,
    width: 50,
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  modalHeaderExit: {},
  modalPriceView: {
    alignItems: 'center',
    padding: 10,
  },
  modalPriceText: {
    fontSize: 30,
    fontWeight: '600',
  },
  modalCategoryView: {
    marginTop: 13,
    marginBottom: 8,
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent: 'flex-end',
  },
  modalCategoryTextView: {
    justifyContent: 'center',
  },
  modalCategoryText: {
    fontSize: 20,
    fontWeight: '600',
  },
  modalCategorySelectView: {
    marginLeft: 20,
  },
  dropdown1BtnStyle: {
    width: width * 0.26,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left', marginLeft: 15 },
});

export default ConsumptionList;
