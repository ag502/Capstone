import * as actionTypes from "src/actions"

const initialState = {
  searchKeyword: '',
  nextPageToken: '',
  prevPageToken: '',
  totalResults: '',
  items: [],
};

const videoDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_VIDEO_DATA:
      return {
        ...initialState,
        ...action.payload
      };
    default:
      return state;
  }
};

export default videoDataReducer;
