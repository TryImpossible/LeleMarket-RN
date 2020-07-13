import './globals/basics';
import './globals/common';

import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { Picker } from 'components/common';
import Overlay, { OverlayHandle } from 'components/common/Overlay';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  const overlayRef = React.useRef<OverlayHandle>(null);

  React.useEffect(() => {
    overlayRef.current?.show();
    setTimeout(() => {
      // overlayRef.current?.dismiss();
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent animated />
      <Picker />
      <Overlay ref={overlayRef} />
    </SafeAreaView>
  );
};

export default App;
