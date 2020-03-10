import * as actionTypes from 'src/actions';

const initialState = {

};

const clippingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CLIPPING_LIST:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default clippingReducer;
