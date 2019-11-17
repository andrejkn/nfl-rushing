import { createSelector } from 'reselect';
// import { initialState } from './reducer';

const selectState = (state) => state.nflRushingDetails;

const makeSelectLoading = () => createSelector(
  selectState,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectState,
  (globalState) => globalState.error
);

const makeSelectPlayersRushing = () => createSelector(
  selectState,
  (globalState) => globalState.playersRushing
);

const makeSelectSortBy = () => createSelector(
  selectState,
  (globalState) => globalState.sortBy
);

export {
  selectState,
  makeSelectLoading,
  makeSelectError,
  makeSelectPlayersRushing,
  makeSelectSortBy,
};
