import React, { useState } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import TabItem, { ItemProps } from './TabItem';

const styles = StyleSheet.create({
  mainTabBar: {
    width: '100%',
    height: Dimens.bottomTabBarHeight + Dimens.safeBottomHeight,
    paddingBottom: Dimens.safeBottomHeight,
    flexDirection: 'row',
    borderTopColor: Colors.dividerColor,
    borderTopWidth: Dimens.dividerHeight,
    overflow: 'visible',
  },
});

interface MainTabBarProps {
  style?: StyleProp<ViewStyle>;
  data?: Array<Omit<ItemProps, 'onPress'>> | undefined;
  initialIndex?: number;
  tabBarOnPress?: (index: number) => void;
}

const MainTabBar: React.FC<MainTabBarProps> & {
  NormalItem: React.FunctionComponent<ItemProps>;
  RaisedItem: React.FunctionComponent<ItemProps>;
} = ({ children, data, initialIndex, tabBarOnPress }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  return (
    <View style={styles.mainTabBar}>
      {data !== undefined &&
        data.map((item, index) => {
          const Item = index === 2 ? TabItem.RaisedItem : TabItem.NormalItem;
          return (
            <Item
              key={String(index)}
              {...item}
              isSelected={index === selectedIndex}
              onPress={() => {
                setSelectedIndex(index);
                tabBarOnPress && tabBarOnPress(index);
              }}
            />
          );
        })}
      {React.Children.map(children, (child: any, index) => {
        const { onPress = () => {} } = child.props || {};
        return React.cloneElement(child, {
          isSelected: selectedIndex === index,
          onPress: () => {
            setSelectedIndex(index);
            onPress();
          },
        });
      })}
    </View>
  );
};

MainTabBar.defaultProps = {
  initialIndex: 0,
};

MainTabBar.NormalItem = TabItem.NormalItem;
MainTabBar.RaisedItem = TabItem.RaisedItem;
export default MainTabBar;
