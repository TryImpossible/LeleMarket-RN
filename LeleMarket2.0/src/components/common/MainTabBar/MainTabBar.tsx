import React, { useState } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import Item, { ItemProps } from './Item';

const styles = StyleSheet.create({
  mainTabBar: {
    width: '100%',
    height: Theme.Dimens.bottomTabBarHeight + Theme.Dimens.safeBottomHeight,
    paddingBottom: Theme.Dimens.safeBottomHeight,
    flexDirection: 'row',
    borderTopColor: Theme.Colors.dividerColor,
    borderTopWidth: Theme.Dimens.dividerHeight,
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
          const CurrentItem = index === 2 ? Item.RaisedItem : Item.NormalItem;
          return (
            <CurrentItem
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

MainTabBar.NormalItem = Item.NormalItem;
MainTabBar.RaisedItem = Item.RaisedItem;
export default MainTabBar;
