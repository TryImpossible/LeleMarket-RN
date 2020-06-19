import { State, Action } from '../typings';

const reducer = (state: State, action: Action & { fix: (state: State) => void }) => {
  const result = action.fix ? action.fix(state) : state;
  return result;
};

export default reducer;
