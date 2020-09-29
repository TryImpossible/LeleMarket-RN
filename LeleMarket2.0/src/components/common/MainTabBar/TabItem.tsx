import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ImageRequireSource,
  StyleProp,
  ImageStyle,
  Animated,
  Easing,
} from 'react-native';

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: Dimens.TabBarHeight,
    width: Dimens.TabBarHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'visible',
  },
  normalIcon: {
    width: toDP(24),
    height: toDP(24),
  },
  raisedIcon: {
    width: toDP(44),
    height: toDP(44),
  },
  normalText: {
    marginTop: toDP(2),
    marginBottom: toDP(4),
    fontSize: toSP(Dimens.textSmallSize),
  },
  raisedText: {
    marginBottom: toDP(4),
    fontSize: toSP(Dimens.textSmallSize),
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
  const scaleValue = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (isSelected) {
      scaleValue.setValue(0.85);
      Animated.timing(scaleValue, {
        toValue: 1,
        easing: Easing.elastic(5),
        useNativeDriver: false,
      }).start();
    } else {
      scaleValue.setValue(1);
    }
  }, [isSelected, scaleValue]);
  return (
    <TouchableOpacity activeOpacity={1} style={[styles.item]} onPress={onPress}>
      <Animated.Image
        source={!isSelected ? icon : selectedIcon}
        style={[styles.normalIcon, { transform: [{ scale: scaleValue }] }, style]}
        resizeMode="contain"
      />
      <Text style={[styles.normalText, { color: isSelected ? Colors.accentColor : Colors.textLightColor }]}>
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
      <Text style={[styles.raisedText, { color: isSelected ? Colors.accentColor : Colors.textLightColor }]}>
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
