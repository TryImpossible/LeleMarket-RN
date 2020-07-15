import React from 'react';
import { StyleSheet, View, StatusBar, Animated } from 'react-native';
import Loader from '../Loader';
import Toast from '../Toast';

const Window: React.FC = ({ children }) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent animated />
        {children}
      </Animated.View>
      <Loader />
      <Toast />
    </View>
  );
};

export default Window;
