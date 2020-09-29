import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import SvgUrl from 'react-native-svg-uri';
import SVGS from '@resources/svgs';

export interface SvgIconProps {
  icon: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

// const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

const SvgIcon: React.FC<SvgIconProps> = ({ style, icon, size, color }) => {
  const svgXmlData = SVGS[icon];

  if (!svgXmlData) {
    console.warn(`${icon} is not exist`);
  }
  // @ts-ignore
  return <SvgUrl style={style} width={size} height={size} svgXmlData={svgXmlData} fill={color} />;
};

export default SvgIcon;
