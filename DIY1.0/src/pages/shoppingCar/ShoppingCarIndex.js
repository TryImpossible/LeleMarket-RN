import React from 'react';

import { StatusBar, StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import BaseComponent from '../../containers/BaseComponent';

import NavBar from '../../widgets/NavBar';

import SvgUri from '../../dependencies/react-native-svg-uri';

import PropTypes from 'prop-types';

import EnhanceList, { EnhanceListStatus } from '../../widgets/EnhanceList';

export default class ShoppingCarIndex extends BaseComponent {

  static propTypes = {
    push: PropTypes.func, //页面跳转方法
  }

  constructor(props) {
    super(props);
    this.initSubscriptions();
  }

  initSubscriptions() {
    const { TabNavigation } = this.props;
    if (__ANDROID__) {
      this.willFocusSubscription = TabNavigation.addListener('willFocus', payload => {
        StatusBar.setBackgroundColor('#FFFFFF');
      });
    }
  }

  componentWillUnmount() {
    this.willFocusSubscription && this.willFocusSubscription.remove();
  }


  render() {
    return (
      <View style={styles.container}>
        <NavBar leftIcon={''} title={'购物车'} />
        <EnhanceList
          getRef={ref => this.enhanceList = ref}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          onRefresh={() => {

          }}
          data={[]}
          status={EnhanceListStatus.noData}
          ListEmptyComponent={() => <EmptyView onPress={this.look} />} />
      </View>
    )
  }

  look = () => {
    const { TabNavigation } = this.props;
    TabNavigation.navigate('Home');
  }
}


/**
 * 数据为空时，显示的友好界面
 * @param {*} props 
 */
const EmptyView = (props) => {
  const { onPress } = props;
  return (
    <View style={styles.emptyView}>
      <SvgUri style={{ marginLeft: -getSize(10) }} width={getSize(120)} height={getSize(80)} source={'pic_empty_shoppingcar'} />
      <Text style={{ color: '#979797', fontSize: getSize(15), marginVertical: getSize(10) }}>{`购物车空空如也`}</Text>
      <TouchableOpacity style={styles.emptyViewButton} activeOpacity={Const.ACTIVE_OPACITY} onPress={onPress}>
        <Text style={{ color: '#FFFFFF', fontSize: getSize(16) }}>{`去逛逛`}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  emptyView: {
    width: Const.SCREEN_WIDTH,
    height: Const.PAGE_HEIGHT - getSize(49),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyViewButton: {
    width: getSize(90),
    height: getSize(32),
    backgroundColor: '#fe3f56',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});