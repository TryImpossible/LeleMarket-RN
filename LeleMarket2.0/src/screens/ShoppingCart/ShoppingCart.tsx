import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Screen } from '@components';

const styles = StyleSheet.create({
  shoppingCart: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ShoppingCart: React.FC<{}> = () => {
  return (
    <Screen style={styles.shoppingCart}>
      <Text>ShoppingCart</Text>
    </Screen>
  );
};

export default ShoppingCart;
