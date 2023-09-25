import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

interface ComparisonProps {
  friendName: number
}

const ComparisonHeader: React.FC<ComparisonProps> = (props) => {
  const [selected, setSelected] = React.useState('');
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.lineBox}>
          <View style={styles.blueBox}></View>
          <Text style={styles.headerText}>내 소비</Text>
        </View>
        <View style={styles.lineBox}>
          <View style={styles.redBox}></View>
          <Text style={styles.headerText}>{props.friendName} 소비</Text>
        </View>
      </View>
        {/* <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
          buttonStyle={
            styles.dropDownBox
          }
          defaultButtonText={"친구1"}
        /> */}
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    width: screenWidth - 40,
    flexDirection: 'row',
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
  },
  lineBox: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  blueBox: {
    width: 20,
    height: 20,
    backgroundColor: '#7777F3',
    marginRight: 10,
  },
  redBox: {
    width: 20,
    height: 20,
    backgroundColor: '#F69496',
    marginRight: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropDownBox: {
    height: 40,
    width: 180,
    borderWidth: 1,
    borderColor: "black",
  },
});

export default ComparisonHeader;
