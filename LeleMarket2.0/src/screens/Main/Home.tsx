import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { ScreenLayout } from 'components/common';
import TabView, { ScrollableTabView } from 'components/common/TabView';
import IMAGES from 'resources/images';
import Discover from './Discover';

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
});

const default_data = [
  { key: 'home', title: Lang.get('components.mainTabBar.home'), icon: IMAGES.ic_nav_menu },
  { key: 'discover', title: Lang.get('components.mainTabBar.discover'), badge: 1 },
  { key: 'customization', title: Lang.get('components.mainTabBar.customization') },
  // { key: 'home', title: Lang.get('components.mainTabBar.shoppingCart') },
  // { key: 'mine', title: Lang.get('components.mainTabBar.mine') },
  // { key: 'home', title: Lang.get('components.mainTabBar.customization') },
  // { key: 'home', title: Lang.get('components.mainTabBar.shoppingCart') },
  // { key: 'mine', title: Lang.get('components.mainTabBar.mine') },
  // { key: 'home', title: Lang.get('components.mainTabBar.home') },
  // { key: 'home', title: Lang.get('components.mainTabBar.discover') },
  // { key: 'home', title: Lang.get('components.mainTabBar.customization') },
  // { key: 'home', title: Lang.get('components.mainTabBar.shoppingCart') },
  // { key: 'mine', title: Lang.get('components.mainTabBar.mine') },
];

let tabViewRef: React.RefObject<ScrollableTabView> = React.createRef<ScrollableTabView>();

const Pager = ({ index, jumpTo }: { index: number; jumpTo: (index: number) => void }) => {
  const [loader, setLoader] = React.useState(true);

  setTimeout(() => {
    setLoader(false);
  }, 1500);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: loader ? 'transparent' : _color(),
      }}
    >
      {loader && <ActivityIndicator size="large" />}
      {index === 1 && !loader && <Discover />}
      {index !== 1 && (
        <>
          {!loader && <Text>{index}</Text>}
          {index === 0 && (
            <Text
              onPress={() => {
                // jumpTo(1)
                tabViewRef.current && tabViewRef.current.jumpTo(1);
              }}
            >
              跳转页面2
            </Text>
          )}
        </>
      )}
    </View>
  );
};

// class HomeC extends React.PureComponent {
//   state = {
//     index: 1,
//     data: default_data,
//   };

//   componentDidMount() {
//     setTimeout(() => {
//       this.setState({
//         data: Object.assign(
//           [],
//           [
//             { key: 'home', title: Lang.get('components.mainTabBar.home'), icon: IMAGES.ic_nav_menu },
//             { key: 'discover', title: Lang.get('components.mainTabBar.discover'), badge: 0 },
//             // { key: 'customization', title: Lang.get('components.mainTabBar.customization') },
//           ],
//         ),
//       });
//       // setIndex(1);
//     }, 3000);
//   }

//   render() {
//     const { data, index } = this.state;
//     return (
//       <ScreenLayout style={styles.home}>
//         <TabView
//           ref={tabViewRef}
//           style={{ marginTop: Theme.Dimens.statusBarHeight }}
//           navigationState={data}
//           // renderTabBar={() => {
//           //   return null;
//           // }}
//           tabBarStyle={{ backgroundColor: 'yellow' }}
//           // tabBarIndicatorMode="label"
//           // tabBarIndicatorWidthPrecent={0.6}
//           initialIndex={index}
//           renderTabBarLeftSection={() => (
//             <View style={{ width: _toDP(30), height: _toDP(48), backgroundColor: 'black' }} />
//           )}
//           renderTabBarRightSection={() => (
//             <View style={{ width: _toDP(50), height: _toDP(48), backgroundColor: 'black' }} />
//           )}
//           renderScene={({ index, jumpTo }) => <Pager index={index} jumpTo={jumpTo} />}
//           // renderTabBarLabel={({ route }) => <Text style={{ color: 'red' }}>{route.title}</Text>}
//           // renderTabBarBadge={({ route }) => <Text style={{ color: 'red' }}>{route.title}</Text>}
//           // tabBarIndicatorMode="label"
//           // tabBarMode="scrollable"
//         />
//       </ScreenLayout>
//     );
//   }
// }

const Home: React.FC<{}> = () => {
  const [index, setIndex] = React.useState(0);
  const [data, setData] = React.useState(default_data);
  React.useEffect(() => {
    setTimeout(() => {
      // setIndex(1);
      setData(
        Object.assign(
          [],
          [
            { key: 'home', title: Lang.get('components.mainTabBar.home'), icon: IMAGES.ic_nav_menu },
            { key: 'discover', title: Lang.get('components.mainTabBar.discover'), badge: 0 },
            { key: 'customization', title: Lang.get('components.mainTabBar.customization') },
          ],
        ),
      );
    }, 3000);
  }, []);
  return (
    <ScreenLayout style={styles.home}>
      <TabView
        ref={tabViewRef}
        style={{ marginTop: Theme.Dimens.statusBarHeight }}
        navigationState={data}
        // renderTabBar={() => {
        //   return null;
        // }}
        tabBarStyle={{ backgroundColor: 'yellow' }}
        // tabBarIndicatorMode="label"
        // tabBarIndicatorWidthPrecent={0.6}
        initialIndex={index}
        renderTabBarLeftSection={() => (
          <View style={{ width: _toDP(30), height: _toDP(48), backgroundColor: 'black' }} />
        )}
        renderTabBarRightSection={() => (
          <View style={{ width: _toDP(50), height: _toDP(48), backgroundColor: 'black' }} />
        )}
        renderScene={({ index, jumpTo }) => <Pager index={index} jumpTo={jumpTo} />}
        // renderTabBarLabel={({ route }) => <Text style={{ color: 'red' }}>{route.title}</Text>}
        // renderTabBarBadge={({ route }) => <Text style={{ color: 'red' }}>{route.title}</Text>}
        // tabBarIndicatorMode="label"
        // tabBarMode="scrollable"
      />
    </ScreenLayout>
  );
};

export default React.memo(Home, () => false);
// export default HomeC;
