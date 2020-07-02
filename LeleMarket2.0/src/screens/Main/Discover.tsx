import React, { useState, useEffect, memo } from 'react';
import { FlatList, Text } from 'react-native';
import { ScreenLayout } from 'components/common';
import PagedList, { PullUpStatus, PullDownStatus } from 'components/common/PagedList';

const PagedFlatList = PagedList(FlatList);

const Item = ({ index }: { index: number }) => {
  return (
    <Text style={{ textAlign: 'center', height: toDP(88), lineHeight: toDP(88), backgroundColor: color() }}>
      {index}
    </Text>
  );
};

const MItem = React.memo(Item, () => false);

const Discover = () => {
  const [pullUpStatus, setPullUpStatus] = useState<PullUpStatus>('pending');
  const [pullDownStatus, setPullDownStatus] = useState<PullDownStatus>('pending');
  const [data, setData] = useState<Array<number>>([]);
  useEffect(() => {
    setPullDownStatus('pending');
    setTimeout(() => {
      setData(Array(20).fill(1));
      setPullDownStatus('refreshCompleted');
      setPullUpStatus('loadMore');
    }, 500);
  }, []);
  const onRefresh = () => {
    setPullDownStatus('refreshing');
    setTimeout(() => {
      setData(Array(5).fill(1));
      setPullDownStatus('refreshCompleted');
      setPullUpStatus('noMoreData');
    }, 1000);
  };
  const onLoadMore = () => {
    setPullUpStatus('loading');
    setTimeout(() => {
      setData([...data, ...Array(20).fill(1)]);
      setPullUpStatus('loadFail');
    }, 500);
  };
  return (
    <ScreenLayout>
      <PagedFlatList
        style={{ flex: 1, marginTop: Dimens.statusBarHeight }}
        data={data}
        pullUpStatus={pullUpStatus}
        pullDownStatus={pullDownStatus}
        onRefresh={onRefresh}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => <MItem index={index} />}
        onLoadMore={onLoadMore}
      />
    </ScreenLayout>
  );
};

export default memo(Discover, () => true);
