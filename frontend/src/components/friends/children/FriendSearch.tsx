import React, { useState } from 'react';
import {
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface FriendSearchProps {
  search: (name: string) => void;
}

const FriendSearch: React.FC<FriendSearchProps> = (props) => {
  const [inputName, setInputName] = useState('');

  function searchHandle() {
    props.search(inputName);
  }

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.textinput}
          placeholder="이름을 입력해주세요"
          maxLength={16}
          onChangeText={(text) => {
            setInputName(text);
          }}
          onSubmitEditing={() => {
            searchHandle();
          }}
        />
        <FontAwesome
          name="search"
          size={40}
          onPress={() => {
            searchHandle();
          }}
        />
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    width: screenWidth - 40,
    paddingTop: 10,
  },
  search: {
    width: screenWidth - 80,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B3BAC4',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: {
    width: screenWidth - 145,
    marginRight: 5,
    fontSize: 24,
  },
});

export default FriendSearch;
