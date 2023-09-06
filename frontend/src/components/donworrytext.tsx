import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const DonWorryText: React.FC = () => {
  return (
    <View style={styles.view}>
      <Image
        source={require('../assets/logo/donworrytext.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {},
  image: {
    height: 200,
    width: Dimensions.get('screen').width * 0.7,
  },
});

export default DonWorryText;
