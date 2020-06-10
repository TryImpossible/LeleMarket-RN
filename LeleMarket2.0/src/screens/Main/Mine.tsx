import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenLayout } from 'components/common';

const styles = StyleSheet.create({
  mine: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Mine: React.FC<{}> = () => {
  return (
    <ScreenLayout style={styles.mine}>
      <Text>Mine</Text>
    </ScreenLayout>
  );
};

export default Mine;
