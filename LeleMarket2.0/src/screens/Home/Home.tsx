import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Screen } from '@components';
import { TabView } from '@components';
import * as actions from '@src/redux/actions';
import { State } from '@src/redux/types';
import ChoicenessScene from './ChoicenessScene';
import TopNavInfoScene from './TopNavInfoScene';

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
});

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
        style={{ marginTop: Dimens.statusBarHeight }}
        tabBarStyle={{ backgroundColor: Colors.white, minHeight: toDP(24) }}
        navigationState={topNavData}
        renderScene={({ index, route: { key } }) => {
          if (index === 0) {
            return <ChoicenessScene />;
          }
          return <TopNavInfoScene id={Number(key)} />;
        }}
        tabBarIndicatorMode="label"
        tabBarMode="scrollable"
      />
    </Screen>
  );
};

export default Home;
