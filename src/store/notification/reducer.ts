import * as Types from './types';

import { ActionInterface, NotificationInterface } from 'interfaces';

const initialState: NotificationInterface = {
  isLoading: false,
  status: null,
  isActive: false,
  disableSubmit: false,
};

const Store = (state = initialState, action: ActionInterface): NotificationInterface => {
  switch (action.type) {
    case Types.LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case Types.SET_IS_ACTIVE:
      return {
        ...state,
        isActive: action.payload,
      };
    case Types.DISABLE_SUBMIT:
      return {
        ...state,
        disableSubmit: action.payload,
      };
    case Types.SET_STATUS:
      return {
        ...state,
        status: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default Store;
