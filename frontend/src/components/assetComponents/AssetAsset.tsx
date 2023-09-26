import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../ContentButton';
import { images } from '../../assets/bank&card';
import { useNavigation } from '@react-navigation/native';
import { accountSearchAccountList } from '../../utils/AccountFunctions';

interface ScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}
interface AssetAssetProps {
  refreshKey: number;
}

const { width } = Dimensions.get('screen');

const formatAmount = (amount: string): string => {
  return parseInt(amount, 10).toLocaleString('ko-KR') + '원';
};

const AssetAsset: React.FC<AssetAssetProps> = (props) => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  const [isExpanded, setIsExpanded] = useState(false);
  const isFocused = useIsFocused();
  const [accounts, setAccounts] = useState<
    Array<{ accountId: number; bankName: string; amount: number }>
  >([]);
  const [accountsAmount, setAccountsAmount] = useState(0);

  useEffect(() => {
    if (!isFocused) {
      setIsExpanded(false);
    }
  }, [isFocused]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const newAccounts: any = await accountSearchAccountList();
        if (
          newAccounts &&
          newAccounts.data &&
          Array.isArray(newAccounts.data.accounts)
        ) {
          setAccounts(newAccounts.data.accounts);
          setAccountsAmount(newAccounts.data.total);
        }
      } catch (error) {
        console.error('에러:', error);
      }
    };
    fetch();
  }, [props.refreshKey]);

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.headText}>자산</Text>
        <Text style={[styles.headText, styles.amountText]}>
          {formatAmount(accountsAmount.toString())}
        </Text>
      </View>

      {accounts.map((item, index) => {
        if (index < 4 || isExpanded) {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('StackNavigation', {
                  screen: 'AccountHistory',
                  params: { accountId: item.accountId },
                });
              }}
            >
              <View style={styles.row}>
                <View style={styles.imageTextContainer}>
                  <Image
                    style={styles.imageStyle}
                    source={images[item.bankName]}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.cardContent}>{item.bankName}</Text>
                    <Text style={styles.spendContent}>
                      {formatAmount(item.amount.toString())}
                    </Text>
                  </View>
                </View>
                <Button
                  title="송금"
                  onPress={() => {
                    navigation.navigate('StackNavigation', {
                      screen: 'WireTranfer',
                      params: { accounts: accounts, accountId: item.accountId },
                    });
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }
        return null;
      })}

      {accounts.length > 4 && (
        <TouchableOpacity onPress={handleToggle}>
          <Text>{isExpanded ? '접기' : '더보기'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: width * 0.03,
  },
  amountText: {
    textAlign: 'right',
  },
  imageStyle: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: (width * 0.13) / 2,
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
  imageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: width * 0.05,
  },
  textContainer: {
    justifyContent: 'flex-start',
    marginLeft: width * 0.04,
  },
  cardContent: {
    textAlign: 'left',
    color: 'grey',
  },
  spendContent: {
    textAlign: 'left',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});

export default AssetAsset;
