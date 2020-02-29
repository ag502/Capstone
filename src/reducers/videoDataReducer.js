import * as actionTypes from 'src/actions';

const initialState = {
  error: '',
  generalSearch: {
    searchType: 1,
    searchKeyword: '',
    nextPageToken: 'init',
    prevPageToken: 'init',
    totalResults: '',
    items: []
  },
  channelSearch: {
    searchType: 3,
    searchKeyword: '',
    nextPageToken: 'init',
    prevPageToken: 'init',
    totalResults: '',
    items: []
  }
};

const videoDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VIDEO_DATA:
      return {
        ...state,
        error: '',
        generalSearch: { ...state.generalSearch, ...action.payload }
      };
    case actionTypes.SET_MORE_VIDEO_DATA:
      return {
        ...state,
        generalSearch: {
          ...state.generalSearch,
          ...action.payload,
          items: [...state.generalSearch.items, ...action.payload.items]
        }
        // ...action.payload,
        // items: [...state.items, ...action.payload.items]
      };
    case actionTypes.VIDEO_DATA_LOAD:
      return {
        ...state,
        isLoading: !state.isLoading
      };
    case actionTypes.SET_CHANNEL_VIDEO_DATA:
      return {
        ...state,
        error: '',
        channelSearch: { ...state.channelSearch, ...action.payload }
      };
    case actionTypes.SET_LOAD_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case actionTypes.SET_CHANNEL_MORE_VIDEO_DATA:
      return {
        ...state,
        channelSearch: {
          ...state.channelSearch,
          ...action.payload,
          items: [...state.channelSearch.items, ...action.payload.items]
        }
      };
    default:
      return state;
  }
};

export default videoDataReducer;
