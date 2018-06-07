import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  propTypes,
  processColor, //字符Color转换为数字 
} from 'react-native';

import BasePage from '../BasePage';

import NavBar from '../../widgets/NavBar';

import SeparatorLine from '../../widgets/SeparatorLine';

import SvgUri from '../../dependencies/react-native-svg-uri';

const Data = [
  {
    icon: 'icon_msg_notice',
    title: '通知消息',
    description: '亲，【客服和售后】现在可在"消息中心"和主页面"我的"->"客服和售后"中查看了......',
    date: '2017/06/10'
  },
  {
    icon: 'icon_msg_service',
    title: '在线客服',
    description: '',
    date: '2018/05/05'
  }
]

export default class MessagePage extends BasePage {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar title={'消息'} />
        <FlatList
          style={{ paddingTop: getSize(12) }}
          data={Data}
          renderItem={({item, index}) => <MsgCell item={item} index={index} />}
          getItemLayout={(data, index) => ({ length: CellHeight, offset: CellHeight * index, index })}
          ItemSeparatorComponent={() => <SeparatorLine />}
          keyExtractor={(item, index) => `message${index}`} />
      </View>
    )
  }
}

const CellHeight = getSize(68); //高度
const MsgCell = props => {
  const { item, index } = props;
  return (
    <View style={styles.msgCell}>
      <SvgUri width={getSize(40)} height={getSize(40)} source={item.icon} />
      <View style={{ flex: 1, marginLeft: getSize(8) }}>
        <View style={styles.msgCellTitleView}>
          <Text style={{ color: '#333333' }}>{item.title}</Text>
          <Text style={{ color: '#999999' }}>{item.date}</Text>
        </View>
        {item.description ? <Text numberOfLines={1} style={{ color: '#666666' }}>{item.description}</Text> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  msgCell: {
    width: Const.SCREEN_WIDTH,
    height: CellHeight,
    backgroundColor: '#fff',
    paddingHorizontal: getSize(15),
    paddingVertical: getSize(8),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  msgCellTitleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
