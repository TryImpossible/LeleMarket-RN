import React from 'react';
import { StyleSheet, SectionList } from 'react-native';
import { useStore, useDispatch, useSelector } from 'react-redux';
import * as actions from 'src/redux/actions';
import { State } from 'src/redux/typings';
import { ChoicenessData } from 'src/models/homeModel';
import PagedList, { PullUpStatus, PullDownStatus } from 'components/common/PagedList';

const PagedSectionList = PagedList(SectionList);

const ChoicenessScene = () => {
  const choicenessData: ChoicenessData = useSelector((state: State) => state.home.choiceness);
  const dispatch = useDispatch();
  React.useEffect(() => {
    // dispatch(actions.choicenessReqeust());
  }, [dispatch]);
  return <PagedSectionList />;
};

export default ChoicenessScene;
