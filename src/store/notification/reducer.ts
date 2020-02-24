import * as Types from './types';

import { ActionInterface, NotificationInterface } from 'interfaces';

const initialState: NotificationInterface = {
  isLoading: false,
  status: null,
};

const Store = (state = initialState, action: ActionInterface): NotificationInterface => {
  switch (action.type) {
    case Types.TEST:
      return state;
    default:
      return state;
  }
};

export default Store;
