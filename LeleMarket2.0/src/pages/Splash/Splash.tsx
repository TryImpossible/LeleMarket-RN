import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import NavigationApi from '../../navigators';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SplashPage = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => NavigationApi.startMain()}>闪屏页</Text>
    </View>
  );
};
SplashPage.navigationOptions = {
  title: 'Details',
};

export default SplashPage;
