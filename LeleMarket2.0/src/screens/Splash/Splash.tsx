import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import NavigationApi from 'navigators';
import { Loader } from 'components/common';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SplashPage = ({ navigation }: Props) => {
  setTimeout(() => {
    Loader.show();
  });
  setTimeout(() => {
    Loader.hide();
  }, 3000);
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
