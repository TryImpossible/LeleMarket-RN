import React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

import { TabNavigator, TabBarBottom } from 'react-navigation'

import BasePage from './BasePage';

import { TabBar } from '../widgets/TabBar';

import HomeIndex from './home/HomeIndex';

import DiscoverIndex from './discover/DiscoverIndex';

import CustomizedIndex from './customized/CustomizedIndex';

import ShoppingCarIndex from './shoppingCar/ShoppingCarIndex';

import MineIndex from './mine/MineIndex';

const TABS = [
  { iconUri: 'icon_tab_bar_home', normalIconColor: '#D5CCCB', activeIconColor: '#FE3F56', nameText: '首页', normalNameColor: '#B0B0B0', activeNameColor: '#FE687A' },
  { iconUri: 'icon_tab_bar_discover', normalIconColor: '#D5CCCB', activeIconColor: '#FE3F56', nameText: '发现', normalNameColor: '#B0B0B0', activeNameColor: '#FE687A' },
  { iconUri: 'icon_tab_bar_customized', normalIconColor: '#D5CCCB', activeIconColor: '#FE3F56', nameText: '定制', normalNameColor: '#B0B0B0', activeNameColor: '#FE687A' },
  { iconUri: 'icon_tab_bar_shoppingcar', normalIconColor: '#D5CCCB', activeIconColor: '#FE3F56', nameText: '购物车', normalNameColor: '#B0B0B0', activeNameColor: '#FE687A' },
  { iconUri: 'icon_tab_bar_mine', normalIconColor: '#D5CCCB', activeIconColor: '#FE3F56', nameText: '我的', normalNameColor: '#B0B0B0', activeNameColor: '#FE687A' },
];

const RootTabNavigator = null;

export default class MainPage extends BasePage {

  // static navigationOptions = ({ navigation, screenProps }) => {
  //   const { params } = navigation.state;

  //   return {
  //     title: params ? params.otherParam : 'A Nested Details Screen',
  //   }
  // };

  constructor(props) {
    super(props);
    this.state = {}
    RootTabNavigator = this.initTabNavigator(this.props.navigation.state.params.initialRouteName || 'Home');
  }

  initTabNavigator(initialRouteName) {
    let actions = { 
      pageName: () => this.getPageName(),
      push: this.push,
      showToast: this.showToast
     };
    return TabNavigator(
      {
        Home: { 
          screen: ({screenProps, navigation}) => <HomeIndex TabNavigation={navigation} { ...actions } /> ,
          navigationOptions: ( navigation ) => {  //屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
            
          } 
        },
        Discover: { screen: ({ screenProps, navigation }) => <DiscoverIndex TabNavigation={navigation} { ...actions } /> },
        Customized: { screen: ({ screenProps, navigation }) => <CustomizedIndex TabNavigation={navigation} { ...actions } /> },
        ShoppingCar: { screen: ({ screenProps, navigation }) => <ShoppingCarIndex TabNavigation={navigation} { ...actions } /> },
        Mine: { screen: ({ screenProps, navigation }) => <MineIndex TabNavigation={navigation} { ...actions } /> }
      },
      {
        initialRouteName: initialRouteName,
        lazy: true,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: false,
        backBehavior: 'Home',
        tabBarComponent: (event) => {
          const { navigationState, jumpToIndex } = event;
          return <TabBar tabs={TABS} selectedIndex={navigationState.index} onTabSelected={ index => jumpToIndex(index) } />;
        }
      }
    );
  }

  render() { 
    return (
      <View style={styles.container}>
        <RootTabNavigator ref={ref => this.rootTabNavigator = ref} />
      </View>
    )
  }

  willFocus(payload) {
    // console.log('willFocus');
  }

  didFocus(payload) { 
    // console.log('didFocus');
  }

  willBlur(payload) {
    // console.log('willBlur');
  }

  didBlur(payload) {
    // console.log('didBlur');
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});