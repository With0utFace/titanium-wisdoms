import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setSelectedWisdom } from 'store/main/actions';

import Wisdom from 'components/Wisdom';
import Spinner from 'components/Spinner';
import Navigation from 'containers/Navigation';

import { State } from 'interfaces';

const WisdomWrapper = () => {
  const { shouldRedirect, wisdomsMap } = useSelector((s: State) => s.main);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(setSelectedWisdom(id));
    if (shouldRedirect) {
      history.push('/404');
    }
  }, [dispatch, history, id, shouldRedirect]);

  if (wisdomsMap.current) {
    return (
      <>
        <Navigation />
        <Wisdom />
      </>
    );
  }

  return <Spinner />;
};

export default WisdomWrapper;
