export interface State {
  home: {
    topNav: { key: string; title: string }[];
  };
}

const initialState = { home: { topNav: [] } };

export default initialState;
