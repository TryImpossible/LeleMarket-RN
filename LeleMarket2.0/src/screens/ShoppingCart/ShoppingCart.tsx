import React from 'react';
import { StyleSheet } from 'react-native';
import { Screen, NavBar } from '@components';

const styles = StyleSheet.create({
  shoppingCart: {},
});

const ShoppingCart: React.FC<{}> = () => {
  return (
    <Screen style={styles.shoppingCart}>
      <NavBar title={'购物车'} backVisible={false} />
    </Screen>
  );
};

export default ShoppingCart;
