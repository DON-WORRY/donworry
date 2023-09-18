import React from 'react';
import { View, Text, TextInput } from 'react-native';

const SignupPrivacyAgreement: React.FC = () => {
  return (
    <Text>
      <TextInput inputMode={'email'} /> 개인정보수집 동의합니다.
    </Text>
  );
};

export default SignupPrivacyAgreement;
