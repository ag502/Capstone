import React, { useEffect, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVideoData, setMoreVideoData } from 'src/actions';
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
      try {
        dispatch(setVideoData('한달살기'));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const loadNextVideoData = page => {
    try {
      dispatch(
        setMoreVideoData(
          keyword,
          searchType,
          nextPage === 'init' ? '' : nextPage
        )
      );
    } catch (error) {
      console.log(error);
    }
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
          mode="clipping"
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
