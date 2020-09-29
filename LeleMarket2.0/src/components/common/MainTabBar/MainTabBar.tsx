import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import TabItem, { ItemProps } from './TabItem';

const styles = StyleSheet.create({
  mainTabBar: {
    width: '100%',
    height: Dimens.TabBarHeight + Dimens.safeBottomHeight,
    paddingBottom: Dimens.safeBottomHeight,
    flexDirection: 'row',
    borderTopColor: Colors.dividerColor,
    borderTopWidth: Dimens.dividerHeight,
    overflow: 'visible',
  },
});

export interface MainTabBarProps {
  style?: StyleProp<ViewStyle>;
  data?: Array<Omit<ItemProps, 'onPress'>> | undefined;
  initialIndex?: number;
  raisedIndex?: number;
  tabBarOnPress?: (index: number) => void;
}

const MainTabBar: React.FC<MainTabBarProps> & {
  NormalItem: React.FunctionComponent<ItemProps>;
  RaisedItem: React.FunctionComponent<ItemProps>;
} = ({ children, data, initialIndex, raisedIndex, tabBarOnPress }) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  useEffect(() => {
    setSelectedIndex(initialIndex);
  }, [initialIndex]);
  return (
    <View style={styles.mainTabBar}>
      {data !== undefined &&
        data.map((item, index) => {
          const Item = index === raisedIndex ? TabItem.RaisedItem : TabItem.NormalItem;
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
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }
        const { onPress } = (child.props || {}) as ItemProps;
        return React.cloneElement<ItemProps>(child, {
          isSelected: selectedIndex === index,
          onPress: () => {
            setSelectedIndex(index);
            onPress && onPress();
          },
        });
      })}
    </View>
  );
};

MainTabBar.defaultProps = {
  initialIndex: 0,
  raisedIndex: -1,
};

MainTabBar.NormalItem = TabItem.NormalItem;
MainTabBar.RaisedItem = TabItem.RaisedItem;
export default MainTabBar;
