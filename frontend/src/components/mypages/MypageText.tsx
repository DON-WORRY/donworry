import React from 'react';
import { Dimensions, View, Text, Image, StyleSheet } from 'react-native';

interface TextProps {
  title: string;
  content: string;
}

const MypageText: React.FC<TextProps> = (props) => {
  return (
    <View style={styles.view_text}>
      <Text style={styles.text_title}>{props.title}</Text>
      <Text style={styles.text_content}>{props.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view_text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  text_title: {
    fontSize: 15,
  },
  text_content: {
    fontSize: 15,
  },
});

export default MypageText;
