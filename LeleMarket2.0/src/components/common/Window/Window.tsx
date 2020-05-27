import React from 'react';
import { StyleSheet, View } from 'react-native';
import Loader from '../Loader';
import Toast from '../Toast';

const Window = () => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Loader />
      <Toast />
    </View>
  );
};

export default Window;
