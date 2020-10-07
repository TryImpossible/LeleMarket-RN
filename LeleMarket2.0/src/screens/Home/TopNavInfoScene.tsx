import React, { useRef, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as actions from '@src/redux/actions';
import { RecommendGoodsBean } from 'src/models/homeModel';
import { WebImage, Divider, Card, Label, Button, PagedFlatList, PullDownStatus, PullUpStatus } from '@components';

const styles = StyleSheet.create({
  icon: {
    width: (__WIDTH__ - toDP(8)) / 2,
    aspectRatio: 1,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: toDP(4),
    paddingVertical: toDP(2),
    backgroundColor: Colors.accentColor,
    marginHorizontal: toDP(4),
    marginBottom: toDP(6),
  },
  name: {
    fontSize: toSP(Dimens.textNormalSize),
    color: Colors.textDarkColor,
    marginTop: toDP(8),
    width: (__WIDTH__ - toDP(36)) / 2,
    textAlign: 'center',
  },
  sell: {
    fontSize: toSP(Dimens.textSmallSize),
    marginVertical: toDP(8),
    width: (__WIDTH__ - toDP(48)) / 2,
    textAlign: 'center',
  },
  btn: {
    borderRadius: toDP(Dimens.borderRadiusXL),
    height: toDP(28),
    marginHorizontal: toDP(30),
    marginBottom: toDP(10),
  },
});

const RecommendGoodsComponent = ({ goods, index }: { goods: RecommendGoodsBean; index: number }) => {
  const { icoUrl, name, sell } = goods;
  return (
    <Card
      style={{
        alignItems: 'center',
        marginBottom: toDP(8),
        marginRight: index % 2 === 0 ? toDP(4) : 0,
        marginLeft: index % 2 === 1 ? toDP(4) : 0,
      }}
    >
      <WebImage style={styles.icon} uri={icoUrl} />
      <View style={styles.tag}>
        <Label style={{ fontSize: toSP(Dimens.textSmallSize), color: Colors.white }}>可图印</Label>
      </View>
      <Divider />
      <Label numberOfLines={1} style={styles.name}>
        {name}
      </Label>
      <Label numberOfLines={1} style={styles.sell}>{`已定制${sell}件`}</Label>
      <Button
        type="secondary"
        style={styles.btn}
        title={'开始定制'}
        titleStyle={{ fontSize: toSP(Dimens.textNormalSize) }}
      />
    </Card>
  );
};

const TopNavInfoScene = ({ id }: { id: number }) => {
  const pageRef = useRef(0);
  const [pullDownStatus, setPullDownStatus] = React.useState<PullDownStatus>('refreshCompleted');
  const [pullUpStatus, setPullUpStatus] = React.useState<PullUpStatus>('pending');
  const [topNavInfoData, setTopNavInfoData] = React.useState<RecommendGoodsBean[]>([]);
  // const topNavInfoData: RecommendGoodsBean[] = useSelector((state: State) => state.home.topNavInfo);
  const dispatch = useDispatch();

  const onRefresh = useCallback(async () => {
    try {
      setPullDownStatus('refreshing');
      pageRef.current = 0;
      const result = await dispatch(actions.topNavInfoReqeust(id, pageRef.current));
      if (result.length <= 0) {
        setPullDownStatus('emptyData');
      } else if (result.length === 10) {
        setPullUpStatus('loadMore');
        setPullDownStatus('refreshCompleted');
      } else {
        setPullDownStatus('refreshCompleted');
      }
      setTopNavInfoData(result);
    } catch (error) {
      setPullDownStatus('refreshingFail');
    }
  }, [dispatch, id]);

  const onLoadMore = useCallback(async () => {
    try {
      setPullUpStatus('loading');
      pageRef.current++;
      const result = await dispatch(actions.topNavInfoReqeust(id, pageRef.current));
      setTopNavInfoData((pre) => pre.concat(result));
      if (result.length >= 0 && result.length < 10) {
        setPullUpStatus('noMoreData');
      } else if (result.length === 10) {
        setPullUpStatus('loadMore');
      } else {
        setPullUpStatus('loadCompleted');
      }
    } catch (error) {
      setPullUpStatus('loadFail');
    }
  }, [dispatch, id]);

  useEffect(() => {
    onRefresh();
  }, [dispatch, id, onRefresh]);

  return (
    <PagedFlatList
      pullUpStatus={pullUpStatus}
      pullDownStatus={pullDownStatus}
      data={topNavInfoData}
      contentContainerStyle={{ paddingTop: toDP(8) }}
      onRefresh={onRefresh}
      onLoadMore={onLoadMore}
      numColumns={2}
      renderItem={({ item, index }) => {
        return <RecommendGoodsComponent goods={item as RecommendGoodsBean} index={index} />;
      }}
    />
  );
};

export default TopNavInfoScene;
