import React from 'react';
import { StyleSheet, View } from 'react-native';
import Wheel from '../Wheel';

const styles = StyleSheet.create({
  picker: {
    // height: 210,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // overflow: 'hidden',
    backgroundColor: 'green',
  },
});

const Picker = () => {
  return (
    <View style={styles.picker}>
      <Wheel />
      <Wheel />
    </View>
  );
};

export default Picker;
