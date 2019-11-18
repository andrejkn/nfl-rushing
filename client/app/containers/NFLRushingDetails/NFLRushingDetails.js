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
import { formatQueryParams } from './utils';
import tableConfiguration from './config';

export default class NFLRushingDetails extends React.PureComponent {
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
      playersRushing,
      sortByColumn,
      sortBy,
      filterByPlayerNameColumn,
      playerName,
    } = this.props;

    const delayCall = (callback, time) => {
      let timeoutId;
      return (param) => {
        param.persist();
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => callback(param), time);
      };
    };

    const onChangePlayerName = delayCall((evt) => {
      filterByPlayerNameColumn(evt.target.value);
    }, 1000);

    const headerEls = tableConfiguration.map(({ label, headerStyleClass, key }) => (
      <div
        key={label}
        className={`${headerStyleClass}
          ${sortBy[key] ? 'sorted-col' : ''}
          ${sortBy[key] !== undefined ? 'sortable-col' : ''}
        `}
        title={key}
        onClick={sortBy[key] !== undefined ? () => sortByColumn(key) : null}
        onKeyPress={sortBy[key] !== undefined ? () => sortByColumn(key) : null}
        role="button"
        tabIndex="0"
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
          <div
            key={label}
            className={`${columnStyleClass} ${playerRushing.longest_rush_touchdown
              && key === 'longest_rush' ? 'touchdown' : ''}`}
          >
            {playerRushing[key]}
          </div>
        ))}
      </div>
    )) : [];

    const loadingEl = (loading) ? (<LoadingIndicator />) : null;
    const errorEl = (error) ? (
      <div className="error-msg">
        Could Not Load NFL Rushing Details
      </div>
    ) : null;

    const downloadCsvURL = `http://localhost:8000/players_rushing/nfl_rushing_csv${formatQueryParams(sortBy, playerName)}`;
    return (
      <article>
        <Helmet>
          <title>NFL Rushing Details</title>
          <meta name="description" content="NFL Rushing Details" />
        </Helmet>
        <div className="details-page">
          <section className="filter-bar">
            <label htmlFor="name">
              Filter By Player:
              <input
                id="name"
                type="text"
                placeholder="Enter Player Name"
                onChange={onChangePlayerName}
              />
            </label>
            <div className="col col50 touchdown td-box">TD</div>
            <a
              className="csv-link"
              href={downloadCsvURL}
            >
              Download CSV
            </a>
          </section>
          <section>
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
  playersRushing: PropTypes.arrayOf(PropTypes.shape({
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
    longest_rush: PropTypes.number,
    longest_rush_touchdown: PropTypes.bool,
    rushing_first_downs: PropTypes.number,
    rushing_first_down_percentage: PropTypes.number,
    rushing_20_plus_yards_each: PropTypes.number,
    rushing_40_plus_yards_each: PropTypes.number,
    rushing_fumbles: PropTypes.number,
  })),
  loadPlayersRushingData: PropTypes.func,
  sortByColumn: PropTypes.func,
  sortBy: PropTypes.shape({
    total_rushing_yards: PropTypes.bool,
    longest_rush: PropTypes.bool,
    total_rushing_touchdowns: PropTypes.bool,
  }),
  filterByPlayerNameColumn: PropTypes.func,
  playerName: PropTypes.string,
};
