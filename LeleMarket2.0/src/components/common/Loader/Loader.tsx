import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Animated, Easing, ViewStyle } from 'react-native';
import Theme from 'utilities/Theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export interface LoaderProps {
  style?: ViewStyle;
}

interface LoaderFunction extends React.FC<LoaderProps> {
  show: () => void;
  dismiss: () => void;
  //   Captcha: React.FunctionComponent<LoginItemProps>;
}

const defaultVisible: boolean = false;
let loaderVisible: boolean = defaultVisible;
let setLoaderVisible: Function = () => {};

const bounceValue = new Animated.Value(1);

const Loader: LoaderFunction = () => {
  [loaderVisible, setLoaderVisible] = useState<boolean>(defaultVisible);
  if (!loaderVisible) {
    return null;
  }
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Animated.View style={[Theme.Loader.style]}>
        <Animated.View style={{ transform: [{ scale: bounceValue }] }}>
          <ActivityIndicator size={'large'} color="#FFF" animating={loaderVisible} />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

Loader.show = () => {
  setLoaderVisible(true);

  Animated.timing(bounceValue, { toValue: 1.2, easing: Easing.ease, useNativeDriver: false }).start();
  bounceValue.addListener(({ value }) => {
    if (value === 1.2) {
      Animated.timing(bounceValue, {
        toValue: 1,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: false,
      }).start();
    }
    if (value === 1) {
      Animated.timing(bounceValue, {
        toValue: 1.2,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: false,
      }).start();
    }
  });
};

Loader.dismiss = () => {
  bounceValue.stopAnimation(() => {
    bounceValue.removeAllListeners();
    setLoaderVisible(false);
  });
};

export default Loader;
