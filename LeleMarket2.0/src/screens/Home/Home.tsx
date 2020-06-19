import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Dispatch, bindActionCreators } from 'redux';
import { useStore, useDispatch, useSelector } from 'react-redux';
import Immutable from 'immutable';
import { ScreenLayout } from 'components/common';
import TabView, { ScrollableTabView, RouteProps } from 'components/common/TabView';
import IMAGES from 'resources/images';
import Discover from '../Main/Discover';
import { Meta } from 'src/redux/typings';
import * as actions from 'src/redux/actions';
import { TopNavItem, TopNavState } from 'src/redux/reducers/homeReducers';

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
});

const default_data = [
  { key: 'home', title: Lang.get('components.mainTabBar.home') },
  { key: 'discover', title: Lang.get('components.mainTabBar.discover') },
  { key: 'customization', title: Lang.get('components.mainTabBar.customization') },
  { key: 'home', title: Lang.get('components.mainTabBar.shoppingCart') },
  { key: 'mine', title: Lang.get('components.mainTabBar.mine') },
  { key: 'home', title: Lang.get('components.mainTabBar.customization') },
  { key: 'home', title: Lang.get('components.mainTabBar.shoppingCart') },
  { key: 'mine', title: Lang.get('components.mainTabBar.mine') },
  { key: 'home', title: Lang.get('components.mainTabBar.home') },
  { key: 'home', title: Lang.get('components.mainTabBar.discover') },
  { key: 'home', title: Lang.get('components.mainTabBar.customization') },
  { key: 'home', title: Lang.get('components.mainTabBar.shoppingCart') },
  { key: 'mine', title: Lang.get('components.mainTabBar.mine') },
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

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const topNav: Array<TopNavItem> = useSelector((state: TopNavState) => state.getIn(['home', 'topNav']));
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.topNavReqeust());
  }, [dispatch]);
  const data = React.useMemo(() => topNav.map(({ id, name }) => ({ key: String(id), title: name })), [topNav]);
  return (
    <ScreenLayout style={styles.home}>
      <TabView
        ref={tabViewRef}
        style={{ marginTop: Theme.Dimens.statusBarHeight }}
        navigationState={data}
        renderScene={({ index, jumpTo }) => <Pager index={index} jumpTo={jumpTo} />}
        tabBarIndicatorMode="label"
        tabBarMode="scrollable"
      />
    </ScreenLayout>
  );
};

export default React.memo(Home);
