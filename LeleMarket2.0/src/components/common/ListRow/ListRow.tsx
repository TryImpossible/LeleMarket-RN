import React from 'react';
import { StyleSheet, TouchableOpacity, TextStyle, StyleProp, Image, ViewStyle, ImageStyle, View } from 'react-native';
import Label from '../Label';
import { ImageSourcePropType } from 'react-native';

const styles = StyleSheet.create({
  listCell: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: toDP(8),
  },
  image: {},
  text: {
    fontWeight: 'bold',
  },
  detailText: {
    color: Colors.textDarkColor,
    fontWeight: 'bold',
    fontSize: toSP(14),
  },
  icon: {
    marginRight: toDP(6),
    width: toDP(16),
    height: toDP(16),
  },
  arrow: {
    marginLeft: toDP(6),
    width: toDP(14),
    height: toDP(14),
    backgroundColor: color(),
  },
});

export interface ListRowProps {
  style?: StyleProp<ViewStyle>;
  image?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  text?: string | number;
  textStyle?: StyleProp<TextStyle>;
  detailText?: string | number;
  detailTextStyle?: StyleProp<TextStyle>;
  icon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  accessoryType?: 'none' | 'arrow' | 'custom';
  accessoryView?: React.ReactNode;
  disabled?: boolean;
}

const ListRow: React.FC<ListRowProps> = ({
  style,
  image,
  imageStyle,
  text,
  textStyle,
  detailText,
  detailTextStyle,
  icon,
  iconStyle,
  accessoryType,
  accessoryView,
  disabled = true,
}) => {
  const renderAccessoryView = () => {
    if (accessoryType === 'none') {
      return null;
    }
    if (accessoryType === 'arrow') {
      return <Image source={1} style={[styles.arrow]} />;
    }
    if (accessoryType === 'custom') {
      return accessoryView;
    }
    return null;
  };
  return (
    <TouchableOpacity style={[styles.listCell, style]} activeOpacity={0.7} disabled={disabled}>
      {image && <Image source={image} style={[styles.image, imageStyle]} />}
      <Label style={[styles.text, textStyle]}>{text}</Label>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
        <Label style={[styles.detailText, detailTextStyle]}>{detailText}</Label>
        {renderAccessoryView()}
      </View>
    </TouchableOpacity>
  );
};

export default ListRow;
