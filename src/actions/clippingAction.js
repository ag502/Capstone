export const ADD_CLIPPING_LIST = 'ADD_CLIPPING_LIST';

export const addClippingList = data => {
  return {
    type: ADD_CLIPPING_LIST,
    payload: data
  };
};
