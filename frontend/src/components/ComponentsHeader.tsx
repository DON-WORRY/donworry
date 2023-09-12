import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const donWorryHeader = require('../assets/logo/DonWorryHeader.png');
const screenWidth = Dimensions.get('screen').width;

const ComponentsHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Image source={donWorryHeader} style={styles.image} />
      <FontAwesome name="bars" size={30} color={'#808080'} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: screenWidth - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    height: screenWidth * 0.08,
    width: screenWidth * 0.35,
  },
});

export default ComponentsHeader;
