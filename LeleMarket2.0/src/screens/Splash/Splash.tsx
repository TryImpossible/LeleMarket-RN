import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import NavigationApi from 'navigators';
import { ScreenLayout } from 'components/common';
import IMAGES from 'resources/images';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
});

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SplashPage = ({ navigation }: Props) => {
  setTimeout(() => {
    NavigationApi.startMain();
  }, 2000);

  return (
    <ScreenLayout style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: Theme.Dimens.safeBottomHeight,
        }}
      >
        <Image
          style={{
            width: _toDP(60),
            height: _toDP(60),
            borderRadius: _toDP(10),
          }}
          source={IMAGES.app_logo}
        />
        <Text
          style={{ marginLeft: _toDP(30), fontSize: _toSP(24), color: Theme.Colors.textLightColor, fontWeight: 'bold' }}
        >
          {Lang.get('appName')}
        </Text>
      </View>
      {/* <Text
        adjustsFontSizeToFit={true}
        numberOfLines={1}
        style={{ width: 30 }}
        onPress={() => {
          NavigationApi.startMain();
        }}
      >
        闪屏页
      </Text> */}
    </ScreenLayout>
  );
};

// SplashPage.navigationOptions = {
//   title: 'SplashPage',
// };

export default SplashPage;
