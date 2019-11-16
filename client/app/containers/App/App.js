/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import NFLRushingDetails from 'containers/NFLRushingDetails/Loadable';

import './style.scss';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - NFL Rushing App"
      defaultTitle="NFL Rushing App"
    >
      <meta name="description" content="NFL Rushing App" />
    </Helmet>
    <Switch>
      <Route exact path="/" component={NFLRushingDetails} />
    </Switch>
  </div>
);

export default App;
