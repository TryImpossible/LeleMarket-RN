import { FlatList, SectionList } from 'react-native';
import PagedList, { PullUpStatus, PullDownStatus, PagedListProps } from './PagedList';

const PagedFlatList = PagedList(FlatList);
const PagedSectionList = PagedList(SectionList);

export type { PullUpStatus, PullDownStatus, PagedListProps };
export { PagedFlatList, PagedSectionList };
