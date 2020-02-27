import * as Types from './types';

import { request, wisdomsURL, genReqCredentials, getWisdoms } from 'api';
import { Dispatch } from 'react';

import {
  setNotificationIsLoading,
  setStatus,
  disableSubmit,
  setIsActive,
} from 'store/notification/actions';

import { WisdomInterface } from 'interfaces';

export const incrementSteps = () => ({
  type: Types.INCREMENT_STEPS,
});

export const resetSteps = () => ({
  type: Types.RESET_STEPS,
});

export const resetRedirect = () => ({
  type: Types.RESET_REDIRECT,
});

export const getHomeMessages = () => ({
  type: Types.GET_HOME_MESSAGES,
});

export const setFirstWisdom = () => ({
  type: Types.SET_FIRST_WISDOM,
});

export const fetchWisdoms = (data: WisdomInterface[]) => ({
  type: Types.FETCH_WISDOMS,
  payload: data,
});

export const setSelectedWisdom = (id: string | undefined) => {
  return (dispatch: Function) => {
    dispatch(setIsLoading());
    dispatch({
      type: Types.SET_SELECTED_WISDOM,
      payload: id,
    });
  };
};

export const setIsLoading = () => ({
  type: Types.SET_ISLOADING,
});

export const setFormModalOpen = (value: boolean) => ({
  type: Types.ADD_WISDOM_MODAL_OPEN,
  payload: value,
});

export const uploadWisdom = (data: WisdomInterface) => (
  dispatch: Dispatch<{ type: string; payload?: any } | Function>
) => {
  dispatch(setNotificationIsLoading());
  dispatch(disableSubmit(true));
  dispatch(() => {
    request('get', wisdomsURL).then(response => {
      const decodedResponse = JSON.parse(Base64.decode(response.data.content));
      request('put', wisdomsURL, {
        ...genReqCredentials('adding data to wisdoms', 'test@test.com', 'test@test.com'),
        content: Base64.encode(JSON.stringify([...decodedResponse, data])),
        sha: response.data.sha,
      })
        .then(succeed => {
          dispatch(setStatus(succeed.status));

          dispatch(setIsActive(true));
          setTimeout(() => {
            dispatch(setIsActive(false));
          }, 3000);

          getWisdoms().then(data => {
            dispatch(fetchWisdoms(data));
            setTimeout(() => {
              dispatch(disableSubmit(false));
            }, 1000);
          });
        })
        .catch(error => {
          dispatch(setStatus(error.response.status));

          dispatch(setIsActive(true));
          setTimeout(() => {
            dispatch(disableSubmit(false));
          }, 1000);

          setTimeout(() => {
            dispatch(setIsActive(false));
          }, 3000);
        });
    });
  });
};
