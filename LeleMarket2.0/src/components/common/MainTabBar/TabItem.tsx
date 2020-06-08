import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, ImageRequireSource, StyleProp, ImageStyle } from 'react-native';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: Theme.Dimens.bottomTabBarHeight,
    width: Theme.Dimens.bottomTabBarHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'visible',
  },
  normalIcon: {
    width: _toDP(24),
    height: _toDP(24),
  },
  raisedIcon: {
    width: _toDP(44),
    height: _toDP(44),
  },
  normalText: {
    marginTop: _toDP(2),
    marginBottom: _toDP(4),
    fontSize: _toSP(Theme.Dimens.textSmallMiniSize),
  },
  raisedText: {
    marginBottom: _toDP(4),
    fontSize: _toSP(Theme.Dimens.textSmallMiniSize),
  },
});

export interface ItemProps {
  style?: StyleProp<ImageStyle>;
  icon: ImageRequireSource;
  selectedIcon: ImageRequireSource;
  text: string;
  isSelected?: boolean;
  onPress: () => void;
}

const NormalItem: React.FC<ItemProps> = ({ style, icon, selectedIcon, isSelected, text, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={1} style={[styles.item]} onPress={onPress}>
      <Image source={!isSelected ? icon : selectedIcon} style={[styles.normalIcon, style]} />
      <Text style={[styles.normalText, { color: isSelected ? Theme.Colors.accentColor : Theme.Colors.textLightColor }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

NormalItem.defaultProps = {
  isSelected: false,
};

const RaisedItem: React.FC<ItemProps> = ({ style, icon, selectedIcon, isSelected, text, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={1} style={[styles.item]} onPress={onPress}>
      <Image source={!isSelected ? icon : selectedIcon} style={[styles.raisedIcon, style]} />
      <Text style={[styles.raisedText, { color: isSelected ? Theme.Colors.accentColor : Theme.Colors.textLightColor }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

RaisedItem.defaultProps = {
  isSelected: false,
};

function isEqual(prevProps: ItemProps, nextProps: ItemProps) {
  return prevProps.isSelected === nextProps.isSelected;
}

export default { NormalItem: React.memo(NormalItem, isEqual), RaisedItem: React.memo(RaisedItem, isEqual) };
