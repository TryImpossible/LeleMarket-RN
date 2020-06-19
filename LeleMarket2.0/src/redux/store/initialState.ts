import Immutable from 'immutable';

interface State {
  id: number;
  name: string;
}

interface HomeState {
  topNav: Immutable.List<State>;
}

export default { home: { topNav: [{ id: 1, name: '1' }] } };
