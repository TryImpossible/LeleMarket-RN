import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScreenLayout } from 'components/common';

const styles = StyleSheet.create({
  customization: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Customization: React.FC<{}> = () => {
  return (
    <ScreenLayout style={styles.customization}>
      <Text>Customization</Text>
    </ScreenLayout>
  );
};

export default Customization;
