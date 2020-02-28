import React from 'react';

import { LinkInterface } from 'interfaces';

import './styles.scss';

const Link = ({ to, children, blank }: LinkInterface) => (
  <a href={to} target={blank ? '_blank' : undefined} className="nav-link">
    {children}
  </a>
);

export default Link;
