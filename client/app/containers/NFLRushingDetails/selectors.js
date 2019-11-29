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

const makeSelectTotalPlayers = () => createSelector(
  selectState,
  (state) => state.totalPlayers
);

const makeSelectSortBy = () => createSelector(
  selectState,
  (state) => state.sortBy
);

const makeSelectPlayerName = () => createSelector(
  selectState,
  (state) => state.playerName
);

const makeSelectPageNumber = () => createSelector(
  selectState,
  (state) => state.pageNumber
);

export {
  selectState,
  makeSelectLoading,
  makeSelectError,
  makeSelectPlayersRushing,
  makeSelectTotalPlayers,
  makeSelectSortBy,
  makeSelectPlayerName,
  makeSelectPageNumber,
};
