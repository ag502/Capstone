import * as actionTypes from 'src/actions';

const initialState = {
  isLoading: false,
  searchType: 1,
  searchKeyword: '',
  nextPageToken: '',
  prevPageToken: '',
  totalResults: '',
  items: []
};

const videoDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_VIDEO_DATA:
      return {
        ...state,
        ...action.payload
      };
    case actionTypes.GET_MORE_VIDEO_DATA:
      return {
        ...state,
        ...action.payload,
        items: [...state.items, ...action.payload.items]
      };
    case actionTypes.VIDEO_DATA_LOAD:
      return {
        ...state,
        isLoading: !state.isLoading
      };
    default:
      return state;
  }
};

export default videoDataReducer;
