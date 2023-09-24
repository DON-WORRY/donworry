import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';
// import SearchableDropdown from 'react-native-searchable-dropdown';
// import Select from "react-select"

type Friend = {
  friendId: number;
  friendName: string;
  friendEmail: string;
};

interface FriendSearchProps {
  search: (name: string) => void;
  friends: Friend[];
}
interface ISearchData {
  cityname: string;
  id: string;
}

const FriendSearch: React.FC<FriendSearchProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const searchAPI = (keyword: string) => {
    return props.friends.filter((v) => v.friendName.includes(keyword));
  };
  const [list, setList] = useState<Friend[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const onChangeKeyword = useCallback((text: string) => {
    setKeyword(text.trim());
  }, []);

  useEffect(() => {
    const getList = () => {
      try {
        setLoading(true);
        // if have API, set here

        // I just use dummy data.
        const data = searchAPI(keyword);
        setList(data);
      } catch (error) {
        // code error
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      getList();
    }, 200);

    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={styles.searchTextInput}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={onChangeKeyword}
            placeholderTextColor={'#000000'}
            style={styles.textInput}
            placeholder="친구 이름 검색"
            value={keyword}
          />
        </View>
      </View>
      {loading ? (
        <View
          style={{
            marginTop: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator color={'#fff'} />
        </View>
      ) : (
        <FlatList
        style={{ maxHeight: 90 }}
          keyExtractor={(item) => item.friendId.toString()}
          data={list}
          disableScrollViewPanResponder={true}
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text
                style={{
                  color: 'black',
                  display: loading ? 'none' : 'flex',
                  paddingVertical: 30,
                }}
              >
                검색 내용이 없습니다.
              </Text>
            </View>
          )}
          renderItem={(items) => {
            const { item } = items;
            return (
              <TouchableOpacity
                onPressIn={() => Keyboard.dismiss()}
                onPress={() => Alert.alert('클릭 시: 동작 코드')}
                activeOpacity={1}
                style={styles.applicationBox}
                key={items.index}
              >
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                ></View>
                <View
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                  }}
                >
                  {/* <Text style={styles.fontStyle}>Id {item.friendId} : </Text> */}
                  <Text style={[styles.fontStyle, { fontWeight: 'bold' }]}>
                    이름: {item.friendName} {'\n'}
                    이메일: {item.friendEmail}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  fontStyle: {
    fontSize: 20,
    color: 'black',
    marginTop: 6,
  },
  applicationBox: {
    borderBottomColor: '#7777F3',
    borderBottomWidth: 2,
    flexDirection: 'row',
  },
  searchTextInput: {
    justifyContent: 'center',
    height: 60,
    lineHeight: 60,
    paddingHorizontal: 5,
    // backgroundColor: '#7777F3',
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
  },

  textInput: {
    color: 'black',
    fontSize: 24,
    marginLeft: 8,
    paddingHorizontal: 7,
    paddingVertical: 0,
    fontWeight: 'bold',
  },
});
export default FriendSearch;
