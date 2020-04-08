import * as actionTypes from 'src/actions';

const initialState = {
  clipping: {},
  preprocess: {}
};

const clippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CLIPPING_LIST:
      return {
        ...state,
        clipping: { ...state.clipping, ...action.payload }
      };
    case actionTypes.ADD_PREPRO_LIST:
      return {
        ...state,
        preprocess: {
          ...state.preprocess,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default clippingReducer;
