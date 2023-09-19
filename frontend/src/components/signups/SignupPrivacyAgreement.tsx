import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

interface SignupPrivacyAgreementProps {
  setIsChecked: (isChecked: boolean) => void,
}


const SignupPrivacyAgreement: React.FC<SignupPrivacyAgreementProps> = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkBox}
        color={isChecked ? '#7777F3' : undefined}
        value={isChecked}
        onValueChange={() => {setIsChecked(!isChecked); props.setIsChecked(!isChecked)}}
      />
      <Text>개인정보수집 동의합니다.</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  checkBox: {
    marginRight: 5,
  },
});
export default SignupPrivacyAgreement;
