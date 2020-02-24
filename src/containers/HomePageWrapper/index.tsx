import React from 'react';
import { useSelector } from 'react-redux';

import TextComponent from 'components/TextComponent';

import { State } from 'interfaces';

const HomePageWrapper = () => {
  const { homePageMessages, steps } = useSelector((s: State) => s.main);

  if (steps % 2 === 0) {
    return null;
  }

  return <TextComponent message={homePageMessages[steps]} classes={`step-${steps}`} />;
};

export default HomePageWrapper;
