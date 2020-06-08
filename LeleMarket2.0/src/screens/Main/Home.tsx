import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { TabView } from 'components/common';
import IMAGES from 'resources/images';

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
});

const data = [
  { key: 'home', title: Lang.get('components.mainTabBar.home'), icon: IMAGES.app_logo },
  { key: 'home', title: Lang.get('components.mainTabBar.discover'), badge: 1 },
  { key: 'home', title: Lang.get('components.mainTabBar.customization') },
  { key: 'home', title: Lang.get('components.mainTabBar.shoppingCart') },
  { key: 'mine', title: Lang.get('components.mainTabBar.mine') },
  // { key: 'home', title: Lang.get('components.mainTabBar.customization') },
  // { key: 'home', title: Lang.get('components.mainTabBar.shoppingCart') },
  // { key: 'mine', title: Lang.get('components.mainTabBar.mine') },
  // { key: 'home', title: Lang.get('components.mainTabBar.home') },
  // { key: 'home', title: Lang.get('components.mainTabBar.discover') },
  // { key: 'home', title: Lang.get('components.mainTabBar.customization') },
  // { key: 'home', title: Lang.get('components.mainTabBar.shoppingCart') },
  // { key: 'mine', title: Lang.get('components.mainTabBar.mine') },
];

const Pager = ({ index }: { index: number }) => {
  const [loader, setLoader] = React.useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 3000);
  if (loader) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: _color(),
        }}
      >
        {loader && <ActivityIndicator size="small" />}
        {!loader && <Text>{index}</Text>}
      </View>
    );
    // return <FlatList data={Array(100).fill(1)} renderItem={({ item, index }) => <Text>{index}</Text>} />;
  }
};

const Home: React.FC<{}> = () => {
  return (
    <View style={styles.home}>
      <TabView
        style={{ marginTop: Theme.Dimens.statusBarHeight }}
        navigationState={data}
        // renderTabBar={() => {
        //   return null;
        // }}
        tabBarStyle={{ backgroundColor: 'yellow' }}
        renderTabBarLeftSection={() => (
          <View style={{ width: _toDP(30), height: _toDP(48), backgroundColor: 'black' }} />
        )}
        renderTabBarRightSection={() => (
          <View style={{ width: _toDP(50), height: _toDP(48), backgroundColor: 'black' }} />
        )}
        renderScene={({ index }) => <Pager index={index} />}
        // renderTabBarLabel={({ route }) => <Text style={{ color: 'red' }}>{route.title}</Text>}
        // renderTabBarBadge={({ route }) => <Text style={{ color: 'red' }}>{route.title}</Text>}
        // tabBarMode="scrollable"
      />
    </View>
  );
};

export default React.memo(Home, () => true);
