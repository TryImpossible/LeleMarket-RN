import './globals/basics';
import './globals/common';

import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Text, View, FlatList } from 'react-native';
import {
  // Picker,
  // Overlay,
  // OverlayHandle,
  // Carousel,
  // CarouselViewHandles,
  // TabView,
  NestedScrollTabView,
} from 'components/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// const images = [
//   { uri: 'https://y.gtimg.cn/music/common/upload/category_area/2717637.jpg?max_age=2592000' },
//   { uri: 'https://y.gtimg.cn/music/common/upload/category_area/2538905.jpg?max_age=2592000' },
//   { uri: 'https://y.gtimg.cn/music/common/upload/category_area/2701695.jpg?max_age=2592000' },
//   // { uri: 'https://y.gtimg.cn/music/common/upload/category_area/1674712.jpg?max_age=2592000' },
//   // { uri: 'https://y.gtimg.cn/music/common/upload/category_area/2609005.jpg?max_age=2592000' },
// ];

const App = () => {
  // const ref = React.useRef<CarouselViewHandles>(null);
  const tabviewRef = React.useRef<NestedScrollTabView>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent animated />

      {/* <Carousel.Image images={images} /> */}

      {/* <Carousel.View ref={ref} style={{ height: toDP(120) }}>
        {images.map((item, index) => {
          return <Image key={`${index}`} style={{ width: __WIDTH__, height: toDP(120) }} source={item} />;
        })}
      </Carousel.View> */}

      {/* <Carousel.View horizontal={false} style={{ height: toDP(120) }} carousel={false}>
        {images.map((item, index) => {
          return <Image key={`${index}`} style={{ width: __WIDTH__, height: toDP(120) }} source={item} />;
        })}
      </Carousel.View> */}

      {/* <Button title="上一张" onPress={() => ref.current?.scrollToPreviousPage()} />
      <Button title="下一张" onPress={() => ref.current?.scrollToNextPage()} /> */}

      <NestedScrollTabView
        ref={tabviewRef}
        bounces={false}
        navigationState={[
          { key: 'home', title: '首页' },
          { key: 'home', title: '发布' },
          { key: 'home', title: '我的' },
        ]}
        renderScene={({ route: { title }, index }) => {
          if (index === 0) {
            return (
              <FlatList
                onTouchStart={() => {
                  console.warn('sdfsd');
                  return true;
                }}
                onScrollBeginDrag={({
                  nativeEvent: {
                    contentOffset: { y },
                  },
                }) => {
                  tabviewRef.current?.setLock(y > 0);
                }}
                onScroll={({
                  nativeEvent: {
                    contentOffset: { y },
                  },
                }) => {
                  tabviewRef.current?.setLock(y > 0);
                }}
                data={Array.from({ length: 30 })}
                keyExtractor={(_item, i) => String(i)}
                renderItem={({ index: i }) => {
                  return (
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 44 }}>
                      <Text>{`${title}${i}`}</Text>
                    </View>
                  );
                }}
              />
            );
          }
          return (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              onTouchStart={() => {
                tabviewRef.current?.setLock(false);
              }}
            >
              <Text>{title}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default App;
