import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    top: _toDP(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface LoaderProps {}

interface LoaderFunction extends React.FC<LoaderProps> {
  show: Function;
  dismiss: Function;
  //   UserName: React.FunctionComponent<LoginItemProps>;
  //   Password: React.FunctionComponent<LoginItemProps>;
  //   Mobile: React.FunctionComponent<LoginItemProps>;
  //   Captcha: React.FunctionComponent<LoginItemProps>;
}

const defaultVisible = false;
let loaderVisible: boolean = defaultVisible;
let setLoaderVisible: Function = () => {};

const Loader: LoaderFunction = () => {
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
Loader.dismiss = (): void => setLoaderVisible(false);

export default Loader;
