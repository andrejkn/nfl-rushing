import { createSelector } from 'reselect';
// import { initialState } from './reducer';

const selectState = (state) => state.nflRushingDetails;

const makeSelectLoading = () => createSelector(
  selectState,
  (state) => state.loading
);

const makeSelectError = () => createSelector(
  selectState,
  (state) => state.error
);

const makeSelectPlayersRushing = () => createSelector(
  selectState,
  (state) => state.playersRushing
);

const makeSelectSortBy = () => createSelector(
  selectState,
  (state) => state.sortBy
);

const makeSelectPlayerName = () => createSelector(
  selectState,
  (state) => state.playerName
);
export {
  selectState,
  makeSelectLoading,
  makeSelectError,
  makeSelectPlayersRushing,
  makeSelectSortBy,
  makeSelectPlayerName,
};
