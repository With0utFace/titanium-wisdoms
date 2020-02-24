import React from 'react';

import { useSelector } from 'react-redux';

import { State } from 'interfaces';

import 'assets/styles/components/Notification.scss';

const Notification = () => {
  const { status, isActive } = useSelector((s: State) => s.notifications);

  const classes = `notification-wrapper 
  ${status && status === 200 ? 'success' : 'error'} 
  ${isActive ? 'active' : ''}`;
  return (
    <div className={classes}>
      <div className="notification-content">
        {status === 200
          ? 'всё прошло заебис, любуйся своей шуткой'
          : 'сорян чувак, что то пошло не так, давай по новой'}
        <div className="triangle" />
        <div className="triangle" />
        <div className="triangle" />
      </div>
    </div>
  );
};

export default Notification;
