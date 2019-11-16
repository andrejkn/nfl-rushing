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

    const playersRushingHeader = (
      <div>
        <div className="header-col col200">Player Name</div>
        <div className="header-col col70">Team</div>
        <div className="header-col col50">POS</div>
      </div>
    );

    const playersRushingRows = playersRushing ? playersRushing.map((playerRushing) => (
      <div key={`pr_${playerRushing.pid}`}>
        <div className="col col200">{playerRushing.name}</div>
        <div className="col col70">{playerRushing.team}</div>
        <div className="col col50">{playerRushing.position}</div>
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
  playersRushing: PropTypes.array,
  loadPlayersRushingData: PropTypes.func,
  playerName: PropTypes.string,
  onChangePlayerName: PropTypes.func,
};
