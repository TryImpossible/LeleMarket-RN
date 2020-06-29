import { ResponseResult } from 'src/models/commonModel';

export interface TopNavBean {
  id: number;
  name: string;
}

export interface TopNavData {
  topNav: TopNavBean[];
}

export interface TopNavResp extends ResponseResult<TopNavData> {}

export type TopNavState = { key: string; title: string }[];

export interface HandpickBean {
  id: number;
  imgUrl: string;
  param1: string;
  param2: string;
  param3: string;
  type: number;
  pid: number;
  module: number;
  url: string;
}

export interface GoodsBean {
  id: number;
  imgUrl: string;
  param1: string;
  param2: string;
  param3: string;
  type: number;
  pid: number;
  layout: number;
}

export interface CustomizationBean {
  id: number;
  imgUrl: string;
  type: number;
  pid: number;
  url: string;
  goods: GoodsBean[];
}

export interface MidNavBean {
  imgUrl: string;
  id: number;
  platform: string;
  name: string;
  about: string;
  key: string;
}

export interface BannerBean {
  id: number;
  imgUrl: string;
  type: number;
  about: string;
  title?: any;
  cont?: any;
  sys: string;
}

export interface ChoicenessData {
  handpick: HandpickBean[];
  customization: CustomizationBean[];
  midNav: MidNavBean[];
  topNav: TopNavBean[];
  banners: BannerBean[];
}

export interface ChoicenessResp extends ResponseResult<ChoicenessData> {}

export type ChoicenessState = {
  title: 'banners' | 'midNav' | 'handpick' | 'customization';
  name?: string;
  data: [BannerBean[]] | [MidNavBean[]] | [HandpickBean[]] | CustomizationBean[];
}[];
