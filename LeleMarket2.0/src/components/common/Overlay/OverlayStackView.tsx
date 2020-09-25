import React, { useRef, useCallback, useImperativeHandle } from 'react';
import { Animated, View, Easing, Text } from 'react-native';
import OverlayView, { OverlayViewProps, OverlayViewHandles } from './OverlayView';

export interface OverlayStackRouteProps {
  key: string;
  element: React.ReactNode;
}

export interface OverlayStackViewProps extends OverlayViewProps {
  routes?: OverlayStackRouteProps[];
}

export interface OverlayStackViewHandles extends OverlayViewHandles {
  push: () => void;
  pop: () => void;
}

const OverlayStackView: React.ForwardRefRenderFunction<OverlayStackViewHandles, OverlayStackViewProps> = (
  {
    style,
    onCloseRequest,
    routes = [
      {
        key: '1',
        element: (
          <View
            style={{ width: 100, height: 100, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}
          >
            <Text>1</Text>
          </View>
        ),
      },
      {
        key: '2',
        element: (
          <View
            style={{
              width: 100,
              height: 150,
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>2</Text>
          </View>
        ),
      },
    ],
    ...restProps
  },
  ref,
) => {
  const [index, setIndex] = React.useState<number>(0);
  const overlayViewRef = useRef<OverlayViewHandles>(null);
  const pathValue = useRef(new Animated.Value(0)).current;

  const widthValue = useRef(new Animated.Value(-1)).current;
  const heightValue = useRef(new Animated.Value(-1)).current;
  let lastWidth = -1;
  let lastHeight = -1;

  // 是否显示
  const isVisible = useCallback(() => (overlayViewRef.current ? overlayViewRef.current.isVisible() : false), []);

  // 显示
  const show = useCallback(
    (callback?: Function) => {
      overlayViewRef.current?.show(() => {
        Animated.timing(pathValue, {
          toValue: 1,
          duration: 200,
          easing: Easing.in(Easing.linear),
          useNativeDriver: false,
        }).start(() => callback && callback());
      });
    },
    [pathValue],
  );

  // 消失
  const dismiss = useCallback(
    (callback?: Function) => {
      onCloseRequest && onCloseRequest();
      Animated.timing(pathValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.linear),
        useNativeDriver: false,
      }).start(() => {
        overlayViewRef.current?.dismiss();
        callback && callback();
      });
    },
    [onCloseRequest, pathValue],
  );

  // 暴露方法给外部调用，类似于类组件的ref.
  useImperativeHandle(ref, () => {
    return {
      isVisible,
      show,
      dismiss,
      push: () => {
        setIndex(1);
      },
      pop: () => {
        setIndex(0);
      },
    };
  });

  return (
    <OverlayView
      ref={overlayViewRef}
      style={[style, { justifyContent: 'center', alignItems: 'center' }]}
      onCloseRequest={dismiss}
      {...restProps}
    >
      <Animated.View
        style={{
          width: widthValue,
          height: heightValue,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{ translateX: 0 }, { translateY: 0 }],
          overflow: 'hidden',
        }}
        onStartShouldSetResponder={() => true}
      >
        <View
          style={{ flex: 0 }}
          onLayout={({ nativeEvent: { layout } }) => {
            const { width, height } = layout;
            if (width === lastWidth && height === lastHeight) {
              return;
            }
            lastWidth = width;
            lastHeight = height;
            Animated.parallel([
              Animated.timing(widthValue, {
                toValue: width,
                easing: Easing.linear,
                duration: 200,
                useNativeDriver: false,
              }),
              Animated.timing(heightValue, {
                toValue: height,
                easing: Easing.linear,
                duration: 200,
                useNativeDriver: false,
              }),
            ]).start();
          }}
        >
          {routes[index].element}
        </View>
      </Animated.View>
    </OverlayView>
  );
};

export default React.forwardRef(OverlayStackView);
