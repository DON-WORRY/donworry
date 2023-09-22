import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface ContentBoxProps {
  children: ReactNode;
  widthPercentage?: number;
}

const ContentBox: React.FC<ContentBoxProps> = ({
  children,
  widthPercentage = 0.9,
}) => {
  return (
    <View
      style={[
        styles.box,
        { width: Dimensions.get('screen').width * widthPercentage },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    borderRadius: 13,
    padding: 20,
    marginBottom: 20,
  },
});

export default ContentBox;
