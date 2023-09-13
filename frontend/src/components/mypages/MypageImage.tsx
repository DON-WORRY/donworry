import React from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';

interface ImageProps {
  style: ImageStyle;
}
const MypageImage: React.FC<ImageProps> = (props) => {
  return (
    <Image
      source={require('../../assets/user/BasicUser.png')}
      style={props.style}
      resizeMode="contain"
    ></Image>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    height: 100,
    width: 100,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default MypageImage;
