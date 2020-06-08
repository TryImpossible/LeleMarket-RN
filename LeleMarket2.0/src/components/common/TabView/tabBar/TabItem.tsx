'use strict';

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageURISource,
  ImageRequireSource,
} from 'react-native';
import Label, { LabelProps } from './Label';
import Icon from './Icon';
import Badge from './Badge';

const styles = StyleSheet.create({
  tabStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    height: _toDP(Theme.Dimens.tabBarHeight),
    lineHeight: _toDP(Theme.Dimens.tabBarHeight),
  },
});

export type IconType = ImageURISource | ImageRequireSource;

export interface RouteProps {
  key: string;
  title: string;
  icon?: IconType;
  badge?: number;
}

export interface TabItemProps extends Omit<LabelProps, 'style' | 'label'> {
  route: RouteProps;
  style?: StyleProp<ViewStyle>;
  onLayout?: (event: LayoutChangeEvent) => void;
  activeColor?: string;
  inactiveColor?: string;
  onPress?: () => void;
  renderLabel?: ({ route, isActive }: { route: RouteProps; isActive?: boolean }) => React.ReactNode;
  labelStyle?: StyleProp<TextStyle>;
  renderIcon?: ({ route, isActive }: { route: RouteProps; isActive?: boolean }) => React.ReactNode;
  renderBadge?: ({ route, isActive }: { route: RouteProps; isActive?: boolean }) => React.ReactNode;
  bdageStyle?: StyleProp<ViewStyle>;
}

const TabItem: React.FC<TabItemProps> = ({
  route,
  style,
  onLayout,
  isActive,
  activeColor,
  inactiveColor,
  onPress,
  renderLabel,
  labelStyle,
  colorValue,
  scaleValue,
  renderIcon,
  renderBadge,
  bdageStyle,
}) => {
  const { title, icon, badge = 0 } = route;
  return (
    <TouchableOpacity
      onLayout={onLayout}
      activeOpacity={1}
      style={[
        styles.tabStyle,
        style,
        {
          backgroundColor: isActive ? activeColor : inactiveColor,
        },
      ]}
      onPress={onPress}
    >
      {icon && ((renderIcon && renderIcon({ route, isActive })) || <Icon source={icon} />)}
      {(renderLabel && renderLabel({ route, isActive })) || (
        <Label style={labelStyle} isActive={isActive} colorValue={colorValue} scaleValue={scaleValue} label={title} />
      )}
      {badge > 0 && ((renderBadge && renderBadge({ route, isActive })) || <Badge style={bdageStyle} count={badge} />)}
    </TouchableOpacity>
  );
};

function isEqual(prevProps: TabItemProps, nextProps: TabItemProps) {
  return prevProps.isActive === nextProps.isActive;
}

export default React.memo(TabItem, isEqual);
