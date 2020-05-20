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

export interface LoaderProps {}

interface LoaderType extends React.FC<LoaderProps> {
  show: Function;
  hide: Function;
  //   UserName: React.FunctionComponent<LoginItemProps>;
  //   Password: React.FunctionComponent<LoginItemProps>;
  //   Mobile: React.FunctionComponent<LoginItemProps>;
  //   Captcha: React.FunctionComponent<LoginItemProps>;
}

const Loader: LoaderType = () => {
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

Loader.show = (): void => setLoaderVisible(true);
Loader.hide = (): void => setLoaderVisible(false);

export default Loader;
