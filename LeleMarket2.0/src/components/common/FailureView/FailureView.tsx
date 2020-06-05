import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
} from 'react-native';
import { app_logo } from 'resources/images';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.Colors.backgroundColor,
  },
  icon: {
    width: _toDP(50),
    height: _toDP(50),
    backgroundColor: Theme.Colors.red,
  },
  prompt: {
    marginTop: _toDP(12),
    fontSize: Theme.Dimens.textNormalSize,
  },
});

export interface FailureViewProps {
  style?: StyleProp<ViewStyle>;
  icon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  prompt?: string | number;
  promptStyle?: StyleProp<TextStyle>;
}

const FailureView: React.FC<FailureViewProps> = ({ style, icon = app_logo, iconStyle, prompt, promptStyle }) => {
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
