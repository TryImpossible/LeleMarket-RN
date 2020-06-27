import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenLayout } from 'components/common';
import TabView, { ScrollableTabView } from 'components/common/TabView';
import Discover from '../Main/Discover';
import * as actions from 'src/redux/actions';
import { State } from 'src/redux/typings';
import ChoicenessScene from './ChoicenessScene';

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
});

let tabViewRef: React.RefObject<ScrollableTabView> = React.createRef<ScrollableTabView>();

const Pager = ({ index }: { index: number; jumpTo: (index: number) => void }) => {
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
  const topNavData = useSelector((state: State) => {
    // console.warn(state);
    return state.home.topNav;
  });
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.topNavReqeust());
  }, [dispatch]);
  return (
    <ScreenLayout style={styles.home}>
      <TabView
        ref={tabViewRef}
        style={{ marginTop: Theme.Dimens.statusBarHeight }}
        navigationState={topNavData}
        renderScene={({ index, jumpTo }) => {
          if (index === 0) {
            return <ChoicenessScene />;
          }
          return <Pager index={index} jumpTo={jumpTo} />;
        }}
        tabBarIndicatorMode="label"
        tabBarMode="scrollable"
      />
    </ScreenLayout>
  );
};

export default Home;
