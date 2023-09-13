import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Animated,
  Keyboard,
} from 'react-native';
import DonWorryText from '../components/logins/LoginDonWorryText';
import Login from '../components/logins/Login';

const LoginPage: React.FC = () => {
  const [moveAnimation] = useState<Animated.Value>(new Animated.Value(0));
  const [fadeInAnimation] = useState<Animated.Value>(new Animated.Value(0));

  const moveAnimationStyles: { transform: [{ translateY: Animated.Value }] } = {
    transform: [{ translateY: moveAnimation }],
  };

  const fadeInAnimationStyles: { opacity: Animated.Value } = {
    opacity: fadeInAnimation,
  };

  useEffect(() => {
    // 첫 번째 애니메이션: 이동 애니메이션
    const moveAnimationSequence = Animated.parallel([
      Animated.timing(moveAnimation, {
        toValue: -190,
        duration: 2000,
        delay: 1000,
        useNativeDriver: false,
      }),
      // 두 번째 애니메이션: 페이드 인 애니메이션
      Animated.timing(fadeInAnimation, {
        toValue: 1,
        duration: 1500,
        delay: 2000,
        useNativeDriver: false,
      }),
    ]);

    moveAnimationSequence.start();
  }, [moveAnimation, fadeInAnimation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.box1}></View>
        <View style={styles.box2}></View>
        <Animated.View style={[moveAnimationStyles, { position: 'absolute' }]}>
          <DonWorryText />
        </Animated.View>
        <Animated.View style={fadeInAnimationStyles}>
          <Login />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  box1: {
    position: 'absolute',
    backgroundColor: '#7777F3',
    width: 500,
    height: 500,
    transform: [{ rotate: '60deg' }],
    left: 220,
    top: -225,
  },
  box2: {
    position: 'absolute',
    backgroundColor: '#8E8E8F',
    width: 500,
    height: 500,
    transform: [{ rotate: '60deg' }],
    right: 220,
    bottom: -225,
  },
  title: {
    fontSize: 30,
  },
});

export default LoginPage;
