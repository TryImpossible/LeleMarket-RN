import './globals/basics';
import './globals/common';

import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { Picker } from 'components/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent animated />
      <Picker />
    </SafeAreaView>
  );
};

export default App;
