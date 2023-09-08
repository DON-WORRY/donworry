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
    padding: 10,
  },
});

export default ContentBox;
