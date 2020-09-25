import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  addBox: {
    width: toDP(56),
    height: toDP(56),
    borderColor: '#A7B0B9',
    borderWidth: Dimens.dividerHeight,
    borderRadius: toDP(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addLine: {
    position: 'absolute',
    width: toDP(22),
    height: toDP(2),
    borderRadius: toDP(2),
    backgroundColor: '#A7B0B9',
  },
});

export interface AddBoxProps {
  onPress?: () => void;
}

const AddBox: React.FC<AddBoxProps> = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity style={styles.addBox} activeOpacity={Dimens.activeOpacity} onPress={onPress}>
      <View style={[styles.addLine]} />
      <View style={[styles.addLine, { transform: [{ rotate: '90deg' }] }]} />
    </TouchableOpacity>
  );
};

export default AddBox;
