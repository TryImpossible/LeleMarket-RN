import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenLayout } from 'components/common';

const styles = StyleSheet.create({
  shoppingCart: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ShoppingCart: React.FC<{}> = () => {
  return (
    <ScreenLayout style={styles.shoppingCart}>
      <Text>ShoppingCart</Text>
    </ScreenLayout>
  );
};

export default ShoppingCart;
