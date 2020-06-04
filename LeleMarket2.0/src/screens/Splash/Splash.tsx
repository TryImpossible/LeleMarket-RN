import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import NavigationApi from 'navigators';
import { ScreenLayout, Loader, Toast } from 'components/common';
import ServerApi from 'services/http/ServerApi';

const testRequest = () => {
  ServerApi.testGet()
    .then((res) => {})
    .catch(() => {});
};

const testLoader = () => {
  setTimeout(() => {
    Loader.show();
  });
  setTimeout(() => {
    Loader.dismiss();
  }, 3000);
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const print = () => {
  console.warn('Lang', Lang.globals.confirm);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SplashPage = ({ navigation }: Props) => {
  setTimeout(() => {
    Loader.show();
    console.warn('__ANDROID__', __ANDROID__);
    console.warn('startsWith', _.startsWith('123', '1'));
    // console.warn('Theme', Theme.Colors.white);
    console.warn('Lang', Lang.appName);
    print();
  }, 200);
  // testRequest();
  return (
    <ScreenLayout style={styles.container}>
      <Text
        onPress={() => {
          Toast.show('测试');
          // NavigationApi.startMain();
        }}
      >
        闪屏页
      </Text>
    </ScreenLayout>
  );
};

SplashPage.navigationOptions = {
  title: 'Details',
};

export default SplashPage;
