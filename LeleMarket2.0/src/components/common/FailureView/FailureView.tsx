import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  StyleProp,
  ViewStyle,
  ImageRequireSource,
  ImageStyle,
  TextStyle,
} from 'react-native';
import IMAGES from 'resources/images';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor,
  },
  icon: {
    width: toDP(50),
    height: toDP(50),
    backgroundColor: Colors.red,
  },
  prompt: {
    marginTop: toDP(12),
    fontSize: Dimens.textNormalSize,
  },
});

export interface FailureViewProps {
  style?: StyleProp<ViewStyle>;
  icon?: ImageRequireSource;
  iconStyle?: StyleProp<ImageStyle>;
  prompt?: string | number;
  promptStyle?: StyleProp<TextStyle>;
}

const FailureView: React.FC<FailureViewProps> = ({ style, icon = IMAGES.app_logo, iconStyle, prompt, promptStyle }) => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container, style]}>
      <Image source={icon} style={[styles.icon, iconStyle]} />
      <Text style={[styles.prompt, promptStyle]} numberOfLines={0}>
        {prompt}
      </Text>
    </View>
  );
};

FailureView.defaultProps = {
  prompt: Lang.get('components.failureView.prompt'),
};

export default FailureView;
