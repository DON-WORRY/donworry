import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenWidth } from '@rneui/themed/dist/config';

type Friend = {
  friendId: number;
  friendName: string;
  friendEmail: string;
};

type RootStackParamList = {
  Home: undefined;
  Spend: undefined;
  Asset: undefined;
  Comparison: {
    friendPk: string;
  };
  Friend: undefined;
};

interface FriendSearchProps {
  friends: Friend[];
  isComparison?: boolean
}

const FriendSearch: React.FC<FriendSearchProps> = (props) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Comparison'>>();

  const [loading, setLoading] = useState(true);
  const searchAPI = (keyword: string) => {
    return props.friends.filter((v) => v.friendName.includes(keyword) || v.friendEmail.includes(keyword));
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
    props.isComparison ? <><View style={comparisonStyles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={comparisonStyles.searchTextInput}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={onChangeKeyword}
            placeholderTextColor={'#B3BAC4'}
            style={styles.textInput}
            placeholder="친구 이름 및 이메일 검색"
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
          renderItem={(items) => {
            const { item } = items;
            return (
              <TouchableOpacity
                onPressIn={() => Keyboard.dismiss()}
                onPress={() =>
                  Alert.alert(
                    `${item.friendName}`,
                    '해당 친구와 비교를 원하시나요?',
                    [
                      {
                        text: '비교하러 가기',
                        onPress: () => {
                          navigation.navigate('Comparison', {
                            friendPk: `${item.friendId}`,
                          });
                        },
                      },
                      { text: '취소하기', onPress: () => {} },
                    ]
                  )
                }
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
    </View></> : <><View style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.searchTextInput}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={onChangeKeyword}
            placeholderTextColor={'#B3BAC4'}
            style={styles.textInput}
            placeholder="친구 이름 및 이메일 검색"
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
          renderItem={(items) => {
            const { item } = items;
            return (
              <TouchableOpacity
                onPressIn={() => Keyboard.dismiss()}
                onPress={() =>
                  Alert.alert(
                    `${item.friendName}`,
                    '해당 친구와 비교를 원하시나요?',
                    [
                      {
                        text: '비교하러 가기',
                        onPress: () => {
                          navigation.navigate('Comparison', {
                            friendPk: `${item.friendId}`,
                          });
                        },
                      },
                      { text: '취소하기', onPress: () => {} },
                    ]
                  )
                }
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
    </View></>
    
  );
};

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: 'white',
  },
  fontStyle: {
    fontSize: 15,
    color: 'black',
    marginTop: 6,
  },
  applicationBox: {
    borderBottomColor: '#7777F3',
    borderBottomWidth: 5,
    flexDirection: 'row',
  },
  searchTextInput: {
    justifyContent: 'center',
    height: 50,
    lineHeight: 60,
    paddingHorizontal: 10,
    // backgroundColor: '#7777F3',
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    width: "100%"
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

const comparisonStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: ScreenWidth - 40,
    // backgroundColor: 'white',
  },
  searchTextInput: {
    justifyContent: 'center',
    height: 50,
    lineHeight: 60,
    paddingHorizontal: 10,
    // backgroundColor: '#7777F3',
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#7777F3',
    width: "100%"
  }
})

export default FriendSearch;
