import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import * as ROUTE from '../../constants/route';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

const Router = ({ loading }) => (
  <>
    {loading ? (
      <p>LOADER</p>
    ) : (
      <Switch>
        <Route path={ROUTE.LOGIN_PAGE} component={LoginPage} />
        <Route path={ROUTE.HOME_PAGE} component={HomePage} />
      </Switch>
    )}
  </>
);

Router.propTypes = {
  loading: PropTypes.bool,
};

Router.defaultProps = {
  loading: false,
};

export default Router;
