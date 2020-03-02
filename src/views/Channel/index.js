import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchVideosChanID } from 'src/utils/axios';
import { setChannelVideoData, setChannleMoreVidoeData } from 'src/actions';
import Videos from '../../components/Video/Videos';

const ChannelPage = ({ match }) => {
  const {
    channelSearch: {
      searchType,
      searchKeyword: keyword,
      nextPageToken: nextPage,
      items: videoItems
    }
  } = useSelector(state => state.videoData);
  const dispatch = useDispatch();
  const { id } = match.params;

  useEffect(() => {
    searchVideosChanID(id).then(res => dispatch(setChannelVideoData(res)));
    return () =>
      dispatch(
        setChannelVideoData({
          searchKeyword: '',
          nextPageToken: 'init',
          prevPageToken: 'init',
          totalResults: '',
          items: []
        })
      );
  }, []);

  const loadNextVideoData = page => {
    searchVideosChanID(id, nextPage).then(res =>
      dispatch(setChannleMoreVidoeData(res))
    );
  };

  console.log(`Channel View Render ${nextPage} ${keyword}`);
  return (
    <Videos
      nextPage={nextPage}
      keyword={keyword}
      loadNextVideoData={loadNextVideoData}
      videoItems={videoItems}
      searchType={searchType}
    />
  );
};

export default ChannelPage;
