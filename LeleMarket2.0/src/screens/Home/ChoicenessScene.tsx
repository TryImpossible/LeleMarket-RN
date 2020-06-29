import React from 'react';
import { StyleSheet, SectionList, Image, Text, View, TouchableOpacity } from 'react-native';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import { useStore, useDispatch, useSelector } from 'react-redux';
import * as actions from 'src/redux/actions';
import { State } from 'src/redux/typings';
import {
  ChoicenessState,
  BannerBean,
  HandpickBean,
  MidNavBean,
  CustomizationBean,
  GoodsBean,
} from 'src/models/homeModel';
import PagedList, { PullDownStatus } from 'components/common/PagedList';

const styles = StyleSheet.create({
  bannerImage: {
    width: __WIDTH__,
    aspectRatio: 2.25,
  },
  bannerPagination: {
    position: 'absolute',
    bottom: _toDP(-16),
    left: 0,
    right: 0,
  },
  bannerDot: {
    width: _toDP(8),
    height: _toDP(8),
    borderRadius: _toDP(4),
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
  midNavItem: {
    backgroundColor: Theme.Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: __WIDTH__ / 4,
    height: __WIDTH__ / 4 - _toDP(10),
  },
  sectionHeader: {
    marginTop: _toDP(8),
    height: _toDP(48),
    backgroundColor: Theme.Colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeaderTitle: {
    fontSize: Theme.Dimens.textTitleSize,
    color: Theme.Colors.textDarkColor,
  },
  line: {
    width: _toDP(30),
    height: _toDP(2),
    backgroundColor: Theme.Colors.black,
  },
});

const PagedSectionList = PagedList(SectionList);

const BannerComponent: React.FC<{ data: BannerBean[] }> = ({ data }) => {
  const [activeIdnex, setActiveIndex] = React.useState<number>(0);
  return (
    <View>
      <Carousel
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
      />
    </View>
  );
};

const MidNavComponent: React.FC<{ data: MidNavBean[] }> = ({ data }) => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {data.map(({ imgUrl, name }, index) => {
        return (
          <TouchableOpacity key={String(index)} activeOpacity={Theme.Dimens.activeOpacity} style={styles.midNavItem}>
            <Image style={{ width: _toDP(40), height: _toDP(40) }} source={{ uri: imgUrl }} />
            <Text style={{ marginTop: _toDP(6) }}>{name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const HandPickComponent: React.FC<{ data: HandpickBean[] }> = ({ data }) => {
  return (
    <View style={{ backgroundColor: Theme.Colors.white, paddingBottom: _toDP(12) }}>
      <Carousel
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
                  borderRadius: _toDP(12),
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
      />
    </View>
  );
};

const CustomizationComponent: React.FC<{ data: CustomizationBean }> = ({ data }) => {
  const { imgUrl, goods = [] } = data;
  return (
    <View style={{ backgroundColor: Theme.Colors.white }}>
      <Image style={{ width: __WIDTH__, aspectRatio: 2.07 }} source={{ uri: imgUrl }} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {goods.slice(0, 3).map((item: GoodsBean, index: number) => {
          return (
            <View key={String(index)} style={{ flex: 1, alignItems: 'center', paddingHorizontal: _toDP(12) }}>
              <Image style={{ width: __WIDTH__ / 3, aspectRatio: 1 }} source={{ uri: item.imgUrl }} />
              <Text
                numberOfLines={1}
                style={{ fontSize: Theme.Dimens.textNormalSize, color: Theme.Colors.textNormalColor }}
              >
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
          <View style={[styles.line, { marginRight: _toDP(24) }]} />
          <Text style={styles.sectionHeaderTitle}>{name}</Text>
          <View style={[styles.line, { marginLeft: _toDP(24) }]} />
        </View>
      )
    );
  }, []);
  const ItemSeparatorComponent = React.useCallback(function () {
    return <View style={{ height: _toDP(10) }} />;
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
