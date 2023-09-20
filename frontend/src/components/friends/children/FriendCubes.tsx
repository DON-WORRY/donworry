import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface FriendCubesProps {
  myName: string | undefined;
}

const FriendCubes: React.FC<FriendCubesProps> = (props) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.smallBox}>
          <FontAwesome name="cube" size={100} style={styles.myCube} />
          <Text style={styles.nameText}>나</Text>
          <Text style={styles.subNameText}>{props.myName}</Text>
        </View>
        <View style={styles.smallBox}>
          <FontAwesome name="cube" size={100} style={styles.goldCube} />
          <Text style={styles.nameText}>절약왕</Text>
          <Text style={styles.subNameText}>각 소비별 절약 1등</Text>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goldCube: {
    color: '#FFD700',
    marginBottom: 5,
  },
  myCube: {
    color: '#7777F3',
    marginBottom: 5,
  },
  smallBox: {
    alignItems: 'center',
    width: (screenWidth - 80) / 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  line: {
    width: screenWidth - 80,
    height: 0,
    borderBottomWidth: 1, // 또는 borderWidth를 사용하여 두께를 조정할 수 있습니다.
    borderBottomColor: 'gray', // 원하는 색상으로 변경할 수 있습니다.
    marginVertical: 10, // 수평선 위아래의 간격 조정 (선택 사항)
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subNameText: {
    fontSize: 16,
  },
});

export default FriendCubes;
