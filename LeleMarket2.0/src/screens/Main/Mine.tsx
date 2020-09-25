import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Screen } from '@components';

const styles = StyleSheet.create({
  mine: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Mine: React.FC<{}> = () => {
  return (
    <Screen style={styles.mine}>
      <Text>Mine</Text>
    </Screen>
  );
};

export default Mine;
