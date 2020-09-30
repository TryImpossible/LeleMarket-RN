import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, isReadyRef } from './NavigationService';
import RootStackNavigator from './RootStackNavigator';

const AppNavigation = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={(state) => {
        console.info('======================================');
        console.info(state);
      }}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
