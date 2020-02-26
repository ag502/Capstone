import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVideoData, setMoreVideoData } from 'src/actions';
import { searchVideosKeyword, searchVideosChanID } from 'src/utils/axios';

import Videos from '../../components/Video/Videos';

function Overview() {
  const {
    searchType,
    items: videoItems,
    searchKeyword: keyword,
    nextPageToken: nextPage
  } = useSelector(state => state.videoData);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Overview mount');
    if (!keyword) {
      dispatch(setVideoData({ searchKeyword: '한달살기' }));
    }
  }, []);

  // Redux Thunk로 바꾸기
  const processVidoeData = async () => {
    try {
      let receivedData = null;
      const page = nextPage === 'init' ? '' : nextPage;
      if (searchType === 1) {
        receivedData = await searchVideosKeyword(keyword, page);
      } else if (searchType === 2) {
        console.log('pass');
      } else if (searchType === 3) {
        receivedData = await searchVideosChanID(keyword, page);
      }

      const {
        data: {
          prevPageToken,
          nextPageToken,
          pageInfo: { totalResults },
          items
        }
      } = receivedData;

      return {
        searchType,
        searchKeyword: keyword,
        nextPageToken: nextPageToken === undefined ? '' : nextPageToken,
        prevPageToken: prevPageToken === undefined ? '' : prevPageToken,
        totalResults,
        items
      };
    } catch (error) {
      console.log(error);
    }
  };

  const loadNextVideoData = page => {
    processVidoeData()
      .then(result => {
        console.log(result);
        dispatch(setMoreVideoData(result));
      })
      .finally(() => {});
  };

  return (
    <Videos
      nextPage={nextPage}
      keyword={keyword}
      loadNextVideoData={loadNextVideoData}
      videoItems={videoItems}
      searchType={searchType}
    />
  );
}

export default Overview;
