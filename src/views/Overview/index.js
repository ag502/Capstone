import React, { useEffect, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVideoData, setMoreVideoData, setLoadError } from 'src/actions';
import {
  searchVideosKeyword,
  searchVideosChanID,
  searchVideosID
} from 'src/utils/axios';

import Videos from '../../components/Video/Videos';

function Overview() {
  const {
    error,
    generalSearch: {
      searchType,
      items: videoItems,
      searchKeyword: keyword,
      nextPageToken: nextPage
    }
  } = useSelector(state => state.videoData);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Overview mount');
    if (!keyword) {
      // dispatch(setVideoData({ searchKeyword: '한달살기' }));
      searchVideosKeyword('한달살기')
        .then(res => {
          dispatch(setVideoData(res));
        })
        .catch(err => {
          dispatch(setLoadError(err.response.status));
        });
    }
  }, []);

  // Redux Thunk로 바꾸기
  const loadVideoData = async () => {
    try {
      let receivedData = null;
      const page = nextPage === 'init' ? '' : nextPage;
      if (searchType === 1) {
        receivedData = await searchVideosKeyword(keyword, page);
      } else if (searchType === 2) {
        receivedData = await searchVideosID(keyword, page);
      } else if (searchType === 3) {
        receivedData = await searchVideosChanID(keyword, page);
      }

      return receivedData;
    } catch (err) {
      console.log(err);
    }
  };

  const loadNextVideoData = page => {
    loadVideoData()
      .then(result => {
        console.log(result);
        dispatch(setMoreVideoData(result));
      })
      .finally(() => {});
  };

  const ErrorNotFound = lazy(() => import('../ErrorNotFound'));

  return (
    <>
      {(!error && keyword && videoItems.length !== 0) ||
      (!error && nextPage === 'init') ? (
        <Videos
          nextPage={nextPage}
          keyword={keyword}
          loadNextVideoData={loadNextVideoData}
          videoItems={videoItems}
          searchType={searchType}
        />
      ) : (
        <Suspense>
          <ErrorNotFound />
        </Suspense>
      )}
    </>
  );
}

export default Overview;
