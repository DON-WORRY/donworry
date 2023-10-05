import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, Dimensions, ViewStyle } from 'react-native';

interface ContentBoxProps {
  children: ReactNode;
  widthPercentage?: number;
  additionalStyle?: ViewStyle;
}

const ContentBox: React.FC<ContentBoxProps> = ({
  children,
  widthPercentage = 0.9,
  additionalStyle,
}) => {
  return (
    <View
      style={[
        styles.box,
        { width: Dimensions.get('screen').width * widthPercentage },
        additionalStyle,
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
