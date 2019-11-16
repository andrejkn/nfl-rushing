/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';

import LoadingIndicator from 'components/LoadingIndicator';

export default class NFLRushingDetails extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const {
      loadPlayersRushingData,
    } = this.props;

    loadPlayersRushingData();
  }

  render() {
    const {
      loading,
      error,
      playerName,
      onChangePlayerName,
      playersRushing,
    } = this.props;

    const col70 = {
      headerStyleClass: 'header-col col70',
      columnStyleClass: 'col col70',
    };

    const col50 = {
      headerStyleClass: 'header-col col50',
      columnStyleClass: 'col col50',
    };

    const col200 = {
      headerStyleClass: 'header-col col200',
      columnStyleClass: 'col col200',
    };

    const tableConfiguration = [{
      label: 'Player',
      key: 'name',
      ...col200,
    }, {
      label: 'Team',
      key: 'team',
      ...col70,
    }, {
      label: 'Pos',
      key: 'position',
      ...col50,
    }, {
      label: 'Att/G',
      key: 'rushing_attempts_per_game_average',
      ...col70,
    }, {
      label: 'Att',
      key: 'rushing_attempts',
      ...col50,
    }, {
      label: 'Yds',
      key: 'total_rushing_yards',
      ...col50,
    }, {
      label: 'Avg',
      key: 'rushing_average_yards_per_attempt',
      ...col50,
    }, {
      label: 'Yds/G',
      key: 'rushing_yards_per_game',
      ...col70,
    }, {
      label: 'TD',
      key: 'total_rushing_touchdowns',
      ...col50,
    }, {
      label: 'Lng',
      key: 'longest_rush',
      ...col50,
    }, {
      label: '1st',
      key: 'rushing_first_downs',
      ...col50,
    }, {
      label: '1st%',
      key: 'rushing_first_down_percentage',
      ...col50,
    }, {
      label: '20+',
      key: 'rushing_20_plus_yards_each',
      ...col50,
    }, {
      label: '40+',
      key: 'rushing_40_plus_yards_each',
      ...col50,
    }, {
      label: 'FUM',
      key: 'rushing_fumbles',
      ...col50,
    }];

    const headerEls = tableConfiguration.map(({ label, headerStyleClass, key }) => (
      <div
        key={label}
        className={headerStyleClass}
        title={key}
      >
        {label}
      </div>
    ));
    const playersRushingHeader = (
      <div>
        <div className="header-col col50">#</div>
        {headerEls}
      </div>
    );

    const playersRushingRows = playersRushing ? playersRushing.map((playerRushing, index) => (
      <div key={`pr_${playerRushing.pid}`}>
        <div className="col col50">{index + 1}</div>
        {tableConfiguration.map(({ label, key, columnStyleClass }) => (
          <div key={label} className={columnStyleClass}>{playerRushing[key]}</div>
        ))}
      </div>
    )) : [];

    const loadingEl = (loading) ? (<LoadingIndicator />) : null;
    const errorEl = (error) ? (
      <div className="error-msg">
        Could Not Load NFL Rushing Details
      </div>
    ) : null;

    return (
      <article>
        <Helmet>
          <title>NFL Rushing Details</title>
          <meta name="description" content="NFL Rushing Details" />
        </Helmet>
        <div className="details-page">
          <section>
            <form onSubmit={() => null}>
              <label htmlFor="name">
                Filter By Player:
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Player Name"
                  value={playerName}
                  onChange={onChangePlayerName}
                />
              </label>
            </form>
            {playersRushingHeader}
            {loadingEl}
            {errorEl}
            {playersRushingRows}
          </section>
        </div>
      </article>
    );
  }
}

NFLRushingDetails.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  playersRushing: PropTypes.arrayOf({
    pid: PropTypes.number,
    name: PropTypes.string,
    team: PropTypes.string,
    position: PropTypes.string,
    rushing_attempts_per_game_average: PropTypes.number,
    rushing_attempts: PropTypes.number,
    total_rushing_yards: PropTypes.number,
    rushing_average_yards_per_attempt: PropTypes.number,
    rushing_yards_per_game: PropTypes.number,
    total_rushing_touchdowns: PropTypes.number,
    longest_rush: PropTypes.string,
    rushing_first_downs: PropTypes.number,
    rushing_first_down_percentage: PropTypes.number,
    rushing_20_plus_yards_each: PropTypes.number,
    rushing_40_plus_yards_each: PropTypes.number,
    rushing_fumbles: PropTypes.number,
  }),
  loadPlayersRushingData: PropTypes.func,
  playerName: PropTypes.string,
  onChangePlayerName: PropTypes.func,
};
