import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Screen } from '@components';

const styles = StyleSheet.create({
  customization: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Customization: React.FC<{}> = () => {
  return (
    <Screen style={styles.customization}>
      <Text>Customization</Text>
    </Screen>
  );
};

export default Customization;
