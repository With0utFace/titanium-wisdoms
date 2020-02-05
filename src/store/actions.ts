import * as Types from './types';

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

export const setSelectedWisdom = (id: string | undefined) => {
  return (dispatch: Function) => {
    dispatch(setIsLoading());
    dispatch({
      type: Types.SET_SELECTED_WISDOM,
      payload: id,
    });
  };
};

const setIsLoading = () => ({
  type: Types.SET_ISLOADING,
});
