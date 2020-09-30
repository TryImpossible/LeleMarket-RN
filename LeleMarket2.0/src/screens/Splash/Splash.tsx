import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
// import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import NavigationApi from '@navigators';
import { Screen } from '@components';
import IMAGES from '@resources/images';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
});

// interface Props {
//   navigation: NavigationScreenProp<NavigationState, NavigationParams>;
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SplashPage = ({ navigation }: Props) => {
  setTimeout(() => {
    NavigationApi.startMain();
  }, 2000);

  return (
    <Screen style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: Dimens.safeBottomHeight + toDP(16),
        }}
      >
        <Image
          style={{
            width: toDP(60),
            height: toDP(60),
            borderRadius: toDP(10),
          }}
          source={IMAGES.app_logo}
        />
        <Text style={{ marginLeft: toDP(30), fontSize: toSP(24), color: Colors.textLightColor, fontWeight: 'bold' }}>
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
    </Screen>
  );
};

// SplashPage.navigationOptions = {
//   title: 'SplashPage',
// };

export default SplashPage;
