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

export interface EmptyViewProps {
  style?: StyleProp<ViewStyle>;
  icon?: ImageRequireSource;
  iconStyle?: StyleProp<ImageStyle>;
  prompt?: string | number;
  promptStyle?: StyleProp<TextStyle>;
}

const EmptyView: React.FC<EmptyViewProps> = ({ style, icon = app_logo, iconStyle, prompt, promptStyle }) => {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container, style]}>
      <Image source={icon} style={[styles.icon, iconStyle]} />
      <Text style={[styles.prompt, promptStyle]} numberOfLines={0}>
        {prompt}
      </Text>
    </View>
  );
};

EmptyView.defaultProps = {
  prompt: Lang.get('components.emptyView.prompt'),
};

export default EmptyView;
