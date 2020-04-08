export const ADD_CLIPPING_LIST = 'ADD_CLIPPING_LIST';
export const ADD_PREPRO_LIST = 'ADD_PREPRO_LIST';

export const addClippingList = data => ({
  type: ADD_CLIPPING_LIST,
  payload: data
});

export const addPreproList = data => ({
  type: ADD_PREPRO_LIST,
  payload: data
});
