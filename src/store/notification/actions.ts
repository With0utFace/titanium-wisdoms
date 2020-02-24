import * as Types from './types';

export const setNotificationIsLoading = () => ({
  type: Types.LOADING,
});

export const setStatus = (status: number) => ({
  type: Types.SET_STATUS,
  payload: status,
});

export const setIsActive = (value: boolean) => ({
  type: Types.SET_IS_ACTIVE,
  payload: value,
});

export const disableSubmit = (value: boolean) => ({
  type: Types.DISABLE_SUBMIT,
  payload: value,
});
