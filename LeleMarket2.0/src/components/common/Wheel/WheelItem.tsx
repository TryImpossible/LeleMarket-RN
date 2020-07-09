import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

interface WheelItemProps {
  data: string;
  height?: number;
  textSize?: number;
  textColor?: string;
  selectedTextColor?: string;
}

const WheelItem: React.FC<WheelItemProps> = ({ data, height, textSize, textColor, selectedTextColor }) => {
  return (
    <Text
      style={[
        {
          height,
          lineHeight: height,
          color: textColor,
          fontSize: textSize,
          transform: [{ scaleX: 1 }, { scaleY: 1 }],
        },
      ]}
    >
      {data}
    </Text>
  );
};

export default WheelItem;
