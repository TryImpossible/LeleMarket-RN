import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.Colors.transparent,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ContainerProps {
  position: 'top' | 'center' | 'bottom';
}

const Container: React.FC<ContainerProps> = ({ position, children }) => {
  if (position === 'top') {
    return (
      <View style={[styles.container, { justifyContent: 'flex-start' }]} pointerEvents="none">
        {children}
      </View>
    );
  }
  if (position === 'bottom') {
    return (
      <View style={[styles.container, { justifyContent: 'flex-end' }]} pointerEvents="none">
        {children}
      </View>
    );
  }
  return (
    <View style={[styles.container, { justifyContent: 'center' }]} pointerEvents="none">
      {children}
    </View>
  );
};

export default Container;
