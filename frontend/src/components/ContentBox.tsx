import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface ContentBoxProps {
  children: ReactNode;
}

const ContentBox: React.FC<ContentBoxProps> = ({ children }) => {
  return <View style={styles.box}>{children}</View>;
};

const styles = StyleSheet.create({
  box: {
    width: Dimensions.get('screen').width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    // elevation: 7, // Android에서 그림자 효과를 추가
    padding: 20,
    marginBottom: 20,
  },
});

export default ContentBox;
