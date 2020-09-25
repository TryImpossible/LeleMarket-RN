import React from 'react';
import { StyleSheet, View, ActivityIndicator, ViewStyle, StyleProp } from 'react-native';

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.white,
    width: toDP(72),
    height: toDP(72),
    borderRadius: toDP(6),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: toDP(5),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: toDP(6),
    shadowOpacity: 0.2,
  },
});

export interface LoadingViewProps {
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  visible?: boolean;
}

const LoadingView: React.FC<LoadingViewProps> = ({ style, containerStyle, visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }, style]}>
      <View style={[styles.box, containerStyle]}>
        <ActivityIndicator size={'small'} color={Colors.accentColor} animating />
      </View>
    </View>
  );
};

LoadingView.defaultProps = {
  visible: true,
};

export default LoadingView;

// import React, { useState } from 'react';
// import { StyleSheet, View, ActivityIndicator, Animated, Easing, ViewStyle } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export interface LoaderProps {
//   style?: ViewStyle;
//   visible?: boolean;
// }

// interface LoaderFunction extends React.FC<LoaderProps> {
//   show: () => void;
//   dismiss: () => void;
// }

// const defaultVisible: boolean = false;
// let loaderVisible: boolean = defaultVisible;
// let setLoaderVisible: Function = () => {};

// const bounceValue = new Animated.Value(1);

// const Loader: LoaderFunction = ({ visible = defaultVisible }) => {
//   [loaderVisible, setLoaderVisible] = useState<boolean>(visible);
//   if (!loaderVisible) {
//     return null;
//   }
//   return (
//     <View style={[StyleSheet.absoluteFill, styles.container]}>
//       <Animated.View style={[Styles.Loader.style]}>
//         <Animated.View style={{ transform: [{ scale: bounceValue }] }}>
//           <ActivityIndicator size={'large'} color="#FFF" animating={loaderVisible} />
//         </Animated.View>
//       </Animated.View>
//     </View>
//   );
// };

// Loader.show = () => {
//   setLoaderVisible(true);

//   Animated.timing(bounceValue, { toValue: 1.2, easing: Easing.ease, useNativeDriver: false }).start();
//   bounceValue.addListener(({ value }) => {
//     if (value === 1.2) {
//       Animated.timing(bounceValue, {
//         toValue: 1,
//         easing: Easing.inOut(Easing.linear),
//         useNativeDriver: false,
//       }).start();
//     }
//     if (value === 1) {
//       Animated.timing(bounceValue, {
//         toValue: 1.2,
//         easing: Easing.inOut(Easing.linear),
//         useNativeDriver: false,
//       }).start();
//     }
//   });
// };

// Loader.dismiss = () => {
//   bounceValue.stopAnimation(() => {
//     bounceValue.removeAllListeners();
//     setLoaderVisible(false);
//   });
// };

// export default Loader;
