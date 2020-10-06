import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '@components';
import { TabView } from '@components';
import Discover from '../Discover';
import * as actions from '@src/redux/actions';
import { State } from '@src/redux/typings';
import ChoicenessScene from './ChoicenessScene';

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
});

let tabViewRef: React.RefObject<TabView> = React.createRef<TabView>();

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
        backgroundColor: loader ? 'transparent' : color(),
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
    return state.home.topNav;
  });
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.topNavReqeust());
  }, [dispatch]);
  return (
    <Screen style={styles.home}>
      <TabView
        ref={tabViewRef}
        style={{ marginTop: __IOS__ ? Dimens.statusBarHeight : 0 }}
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
    </Screen>
  );
};

export default Home;
