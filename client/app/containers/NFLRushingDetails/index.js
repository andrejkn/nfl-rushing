import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';


import {
  makeSelectPlayersRushing,
  makeSelectTotalPlayers,
  makeSelectLoading,
  makeSelectError,
  makeSelectSortBy,
  makeSelectPlayerName,
  makeSelectPageNumber,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  loadPlayersRushing,
  sortBy,
  filterByPlayerName,
  changePageNumber,
} from './actions';

import NFLRushingDetails from './NFLRushingDetails';

const mapDispatchToProps = (dispatch) => ({
  loadPlayersRushingData: () => dispatch(loadPlayersRushing()),
  sortByColumn: (columnName) => dispatch(sortBy(columnName)),
  filterByPlayerNameColumn: (name) => dispatch(filterByPlayerName(name)),
  changePageNumber: (pageNumber) => dispatch(changePageNumber(pageNumber)),
});

const mapStateToProps = createStructuredSelector({
  playersRushing: makeSelectPlayersRushing(),
  totalPlayers: makeSelectTotalPlayers(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  sortBy: makeSelectSortBy(),
  playerName: makeSelectPlayerName(),
  pageNumber: makeSelectPageNumber(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'nflRushingDetails', reducer });
const withSaga = injectSaga({ key: 'nflRushingDetails', saga });

export default compose(withReducer, withSaga, withConnect)(NFLRushingDetails);
export { mapDispatchToProps };
