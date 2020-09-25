import React from 'react';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import WebImage, { WebImageProps } from '../WebImage';

export interface AvatarProps extends WebImageProps {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ disabled, onPress, ...restProps }) => {
  return (
    <TouchableOpacity disabled={!onPress || disabled} onPress={onPress} activeOpacity={Dimens.activeOpacity}>
      <WebImage {...restProps} />
    </TouchableOpacity>
  );
};

export default Avatar;
