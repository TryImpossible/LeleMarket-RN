import React, { useRef, useMemo, useCallback, useState } from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle, Animated } from 'react-native';
import IMAGES from '../../../resources/images';

const styles = StyleSheet.create({
  segmentedBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: toDP(4),
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    backgroundColor: '#FFF',
    height: '100%',
  },
  titleBox: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: Dimens.textTitleSize,
    color: Colors.accentColor,
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    marginVertical: toDP(8),
    backgroundColor: Colors.dividerColor,
  },
});

export interface SegmentedBarProps {
  style?: StyleProp<ViewStyle>;
  width: number;
  height: number;
  titles: string[];
  initialIndex: number;
  onChange?: (index: number) => void;
}

const SegmentedBar: React.FC<SegmentedBarProps> = ({
  style,
  width = toDP(355),
  height = toDP(40),
  titles = ['持有矿机', '购买矿机', '过期矿机'],
  initialIndex = 0,
  onChange,
}) => {
  const [index, setIndex] = useState<number>(initialIndex);
  const itemWidth = useMemo(() => width / titles.length, [titles.length, width]);
  const pathValue = useRef(new Animated.Value(initialIndex * itemWidth)).current;
  const onPress = useCallback(
    (i) => {
      Animated.spring(pathValue, { toValue: i * (itemWidth + 1), bounciness: 4, useNativeDriver: false }).start();
      onChange && onChange(i);
      setIndex(i);
    },
    [itemWidth, pathValue, onChange],
  );
  return (
    <View style={[styles.segmentedBar, style, { width, height }]}>
      <Animated.Image
        style={[styles.indicator, { width: itemWidth, left: pathValue }]}
        source={{ uri: IMAGES.bg_segmentedBar_selected }}
      />
      {titles.map((item, i) => {
        return (
          <React.Fragment key={String(i)}>
            <View
              style={[styles.titleBox, { width: itemWidth }]}
              onStartShouldSetResponder={() => true}
              onResponderGrant={() => onPress(i)}
            >
              <Text
                style={[
                  styles.title,
                  index === i
                    ? { color: '#FFF', fontWeight: 'bold' }
                    : { color: Colors.accentColor, fontWeight: 'normal' },
                ]}
              >
                {item}
              </Text>
            </View>
            {i < titles.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default SegmentedBar;
