import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

interface SignupPrivacyAgreementProps {
  setIsChecked: (isChecked: boolean) => void;
}

const SignupPrivacyAgreement: React.FC<SignupPrivacyAgreementProps> = (
  props
) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkBox}
        color={isChecked ? '#7777F3' : undefined}
        value={isChecked}
        onValueChange={() => {
          setIsChecked(!isChecked);
          props.setIsChecked(!isChecked);
        }}
      />
      <Text>개인정보 수집 이용 동의</Text>
      <Text style={styles.cautionText}>(필수)</Text>
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
  cautionText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
export default SignupPrivacyAgreement;
