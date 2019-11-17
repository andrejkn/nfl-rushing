import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';


import {
  makeSelectPlayersRushing,
  makeSelectLoading,
  makeSelectError,
  makeSelectSortBy,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  loadPlayersRushing,
  sortBy,
} from './actions';

import NFLRushingDetails from './NFLRushingDetails';

const mapDispatchToProps = (dispatch) => ({
  loadPlayersRushingData: () => dispatch(loadPlayersRushing()),
  sortByColumn: (columnName) => dispatch(sortBy(columnName)),
});

const mapStateToProps = createStructuredSelector({
  playersRushing: makeSelectPlayersRushing(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  sortBy: makeSelectSortBy(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'nflRushingDetails', reducer });
const withSaga = injectSaga({ key: 'nflRushingDetails', saga });

export default compose(withReducer, withSaga, withConnect)(NFLRushingDetails);
export { mapDispatchToProps };
