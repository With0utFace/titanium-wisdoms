import React, { useEffect } from 'react';
import { Route, useHistory, Redirect, Switch, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import WisdomWrapper from 'containers/WisdomWrapper';
import HomePageWrapper from 'containers/HomePageWrapper';
import Page404 from 'components/Page404';
import Spinner from 'components/Spinner';

import { incrementSteps, resetSteps, setFirstWisdom } from 'store/actions';

import { StoreInterface } from 'interfaces';

import 'assets/styles/containers/App.scss';

const App = () => {
  const { wisdoms, steps, firstWisdomId } = useSelector((s: StoreInterface) => s);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!firstWisdomId) {
      dispatch(setFirstWisdom());
    }
    if (location.pathname === '/home') {
      const interval = steps % 2 === 0 ? 200 : 2000;
      if (steps <= 4) {
        setTimeout(() => {
          dispatch(incrementSteps());
        }, interval);
      }
      if (steps >= 5) {
        setTimeout(() => {
          history.push(`/wisdoms/${firstWisdomId}`);
          dispatch(resetSteps());
        }, 2000);
      }
    }
  }, [dispatch, firstWisdomId, history, location.pathname, steps]);

  if (wisdoms) {
    return (
      <div className="app-root full-screen flex-centered">
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home">
            <HomePageWrapper />
          </Route>
          <Route exact path="/wisdoms/:id">
            <WisdomWrapper />
          </Route>
          <Route path="/404" component={Page404} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    );
  }

  return <Spinner />;
};

export default App;
