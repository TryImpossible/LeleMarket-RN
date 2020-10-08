export interface MineIndexBean {
  icon: number;
  text: string;
}

export type MineIndexState = {
  title: 'orders' | 'helps' | 'more';
  data: [MineIndexBean[]] | MineIndexBean[];
}[];
