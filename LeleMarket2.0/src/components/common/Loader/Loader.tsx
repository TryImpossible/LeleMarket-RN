import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const defaultVisible = false;
let loaderVisible: boolean = defaultVisible;
let setLoaderVisible: Function = () => {};

const styles = StyleSheet.create({
  container: {
    top: _toDP(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loader = () => {
  [loaderVisible, setLoaderVisible] = useState(false);
  if (!loaderVisible) {
    return null;
  }
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <ActivityIndicator size={'large'} animating={loaderVisible} />
    </View>
  );
};
Loader.show = () => setLoaderVisible(true);
Loader.hide = () => setLoaderVisible(false);

export default Loader;
