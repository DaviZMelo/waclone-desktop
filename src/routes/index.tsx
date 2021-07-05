import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Connection from '../pages/Connection';
import Help from '../pages/Help';
import Configurations from '../pages/Configurations';
import GroupConfiguration from '../pages/GroupConfiguration';
import UserConfiguration from '../pages/UserConfiguration';
import LinksConfiguration from '../pages/LinksConfiguration';
import LogsConfiguration from '../pages/LogsConfiguration';
import AllConfiguration from '../pages/GeneralConfiguration';
import Home from '../pages/Start';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Connection} />
    <Route path="/dashboard" exact component={Home} isPrivate />
    <Route path="/dashboard/help" component={Help} isPrivate />
    <Route
      path="/dashboard/config"
      exact
      component={Configurations}
      isPrivate
    />
    <Route
      path="/dashboard/config/groups"
      component={GroupConfiguration}
      isPrivate
    />
    <Route
      path="/dashboard/config/users"
      component={UserConfiguration}
      isPrivate
    />
    <Route
      path="/dashboard/config/links"
      component={LinksConfiguration}
      isPrivate
    />
    <Route
      path="/dashboard/config/logs"
      component={LogsConfiguration}
      isPrivate
    />
    <Route
      path="/dashboard/config/all"
      component={AllConfiguration}
      isPrivate
    />
  </Switch>
);

export default Routes;
