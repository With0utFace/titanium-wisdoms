import React from 'react';

import 'assets/styles/components/Notification.scss';

const Notification = () => {
  const classes = `notification-wrapper`;
  return (
    <div className={classes}>
      <span>send with success</span>
    </div>
  );
};

export default Notification;
