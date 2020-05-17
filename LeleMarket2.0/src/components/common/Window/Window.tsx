import React from 'react';
import { StyleSheet, View } from 'react-native';
import Loader from '../Loader';

const Window = () => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Loader />
    </View>
  );
};

export default Window;
