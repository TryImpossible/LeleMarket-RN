import React, { useRef } from 'react';
import { StyleSheet, View, Image, ImageProps } from 'react-native';

const styles = StyleSheet.create({
  reset: {
    margin: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: Colors.transparent,
  },
});

export interface WebImageProps extends Omit<ImageProps, 'source'> {
  uri: string;
}

const WebImage: React.FC<WebImageProps> = ({ style, uri, defaultSource, ...restProps }) => {
  const _placeholderRef = useRef<Image>(null);
  return (
    <View
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => {
        _placeholderRef.current?.setNativeProps({ width: width * 0.9, height: height * 0.9 });
      }}
      style={[style, { justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }]}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          { justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.screenBackgroundColor },
        ]}
      >
        {defaultSource && <Image ref={_placeholderRef} resizeMode="contain" source={defaultSource} />}
      </View>
      {!!uri && (
        <Image
          style={[style, styles.reset]}
          source={{ uri }}
          {...restProps}
          // onLoadStart={() => {
          //   console.warn('onLoadStart');
          // }}
          // onLoad={() => {
          //   console.warn('onLoad');
          // }}
          // onLoadEnd={() => {
          //   console.warn('onLoadEnd');
          // }}
          // onError={() => {
          //   console.warn('onError');
          // }}
        />
      )}
    </View>
  );
};

export default WebImage;
