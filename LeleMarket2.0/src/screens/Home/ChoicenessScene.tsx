/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
// import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '@src/redux/actions';
import { State } from '@src/redux/typings';
import {
  ChoicenessState,
  BannerBean,
  HandpickBean,
  MidNavBean,
  CustomizationBean,
  GoodsBean,
} from 'src/models/homeModel';
import { PagedSectionList, PullDownStatus } from '@components';

const styles = StyleSheet.create({
  bannerImage: {
    width: __WIDTH__,
    aspectRatio: 2.25,
  },
  bannerPagination: {
    position: 'absolute',
    bottom: toDP(-16),
    left: 0,
    right: 0,
  },
  bannerDot: {
    width: toDP(8),
    height: toDP(8),
    borderRadius: toDP(4),
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  midNavItem: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: __WIDTH__ / 4,
    height: __WIDTH__ / 4 - toDP(10),
  },
  sectionHeader: {
    marginTop: toDP(8),
    height: toDP(48),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeaderTitle: {
    fontSize: Dimens.textTitleSize,
    color: Colors.textDarkColor,
  },
  line: {
    width: toDP(30),
    height: toDP(2),
    backgroundColor: Colors.black,
  },
});

const BannerComponent: React.FC<{ data: BannerBean[] }> = ({ data }) => {
  const [activeIdnex, setActiveIndex] = React.useState<number>(0);
  return (
    <View>
      {/* <Carousel
        // ref={(c) => {
        //   this._carousel = c;
        // }}
        data={data}
        renderItem={({ item }: { item: BannerBean }) => {
          return <Image style={[styles.bannerImage]} source={{ uri: item.imgUrl }} />;
        }}
        onSnapToItem={(index) => setActiveIndex(index)}
        sliderWidth={__WIDTH__}
        itemWidth={__WIDTH__}
        inactiveSlideScale={0.99}
        enableSnap
        loop
        autoplay
      />
      <Pagination
        containerStyle={styles.bannerPagination}
        dotsLength={data.length}
        activeDotIndex={activeIdnex}
        dotStyle={styles.bannerDot}
        inactiveDotScale={1}
      /> */}
    </View>
  );
};

const MidNavComponent: React.FC<{ data: MidNavBean[] }> = ({ data }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {data.map(({ imgUrl, name }, index) => {
        return (
          <TouchableOpacity key={String(index)} activeOpacity={Dimens.activeOpacity} style={styles.midNavItem}>
            <Image style={{ width: toDP(40), height: toDP(40) }} source={{ uri: imgUrl }} />
            <Text style={{ marginTop: toDP(6) }}>{name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const HandPickComponent: React.FC<{ data: HandpickBean[] }> = ({ data }) => {
  return (
    <View style={{ backgroundColor: Colors.white, paddingBottom: toDP(12) }}>
      {/* <Carousel
        // ref={(c) => {
        //   this._carousel = c;
        // }}
        data={data}
        renderItem={({ item }: { item: HandpickBean }, parallaxProps) => {
          return (
            <View style={{ width: __WIDTH__ - 60, aspectRatio: 2.05 }}>
              <ParallaxImage
                source={{ uri: item.imgUrl }}
                containerStyle={{
                  flex: 1,
                  marginBottom: 1, // Prevent a random Android rendering issue
                  borderRadius: toDP(12),
                }}
                style={{ ...StyleSheet.absoluteFillObject, resizeMode: 'contain' }}
                parallaxFactor={0.4}
                {...parallaxProps}
              />
            </View>
          );
        }}
        sliderWidth={__WIDTH__}
        itemWidth={__WIDTH__ - 60}
        layoutCardOffset={30}
        hasParallaxImages
        activeSlideAlignment="start"
        enableSnap
        loop
      /> */}
    </View>
  );
};

const CustomizationComponent: React.FC<{ data: CustomizationBean }> = ({ data }) => {
  const { imgUrl, goods = [] } = data;
  return (
    <View style={{ backgroundColor: Colors.white }}>
      <Image style={{ width: __WIDTH__, aspectRatio: 2.07 }} source={{ uri: imgUrl }} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {goods.slice(0, 3).map((item: GoodsBean, index: number) => {
          return (
            <View key={String(index)} style={{ flex: 1, alignItems: 'center', paddingHorizontal: toDP(12) }}>
              <Image style={{ width: __WIDTH__ / 3, aspectRatio: 1 }} source={{ uri: item.imgUrl }} />
              <Text numberOfLines={1} style={{ fontSize: Dimens.textNormalSize, color: Colors.textNormalColor }}>
                {item.param1}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const ChoicenessScene = () => {
  const [pullDownStatus, setPullDownStatus] = React.useState<PullDownStatus>('refreshCompleted');
  const choicenessData: ChoicenessState = useSelector((state: State) => state.home.choiceness);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(actions.choicenessReqeust());
  }, [dispatch]);

  const onRefresh = React.useCallback(async () => {
    setPullDownStatus('refreshing');
    await dispatch(actions.choicenessReqeust());
    setPullDownStatus('refreshCompleted');
  }, [dispatch]);

  const renderSectionHeader = React.useCallback(({ section: { name } }) => {
    return (
      name && (
        <View style={styles.sectionHeader}>
          <View style={[styles.line, { marginRight: toDP(24) }]} />
          <Text style={styles.sectionHeaderTitle}>{name}</Text>
          <View style={[styles.line, { marginLeft: toDP(24) }]} />
        </View>
      )
    );
  }, []);
  const ItemSeparatorComponent = React.useCallback(function () {
    return <View style={{ height: toDP(10) }} />;
  }, []);
  return (
    <PagedSectionList
      pullDownStatus={pullDownStatus}
      pullUpStatus="loadCompleted"
      onRefresh={onRefresh}
      sections={choicenessData}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={renderSectionHeader}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={({ item, section: { title } }) => {
        switch (title) {
          case 'banners':
            return <BannerComponent data={item as BannerBean[]} />;
          case 'midNav':
            return <MidNavComponent data={item as MidNavBean[]} />;
          case 'handpick':
            return <HandPickComponent data={item as HandpickBean[]} />;
          case 'customization':
            return <CustomizationComponent data={item as CustomizationBean} />;
          default:
            return null;
        }
      }}
    />
  );
};

export default ChoicenessScene;
