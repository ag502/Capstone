import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchVideosChanID } from 'src/utils/axios';
import { setChannelVideoData, setChannleMoreVidoeData } from 'src/actions';
import Videos from '../../components/Video/Videos';

const processData = (data, keyword) => {
  const {
    data: {
      prevPageToken,
      nextPageToken,
      pageInfo: { totalResults },
      items
    }
  } = data;

  return {
    searchKeyword: keyword,
    nextPageToken: nextPageToken === undefined ? '' : nextPageToken,
    prevPageToken: prevPageToken === undefined ? '' : prevPageToken,
    totalResults,
    items
  };
};

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
    searchVideosChanID(id)
      .then(data => processData(data, id))
      .then(res => dispatch(setChannelVideoData(res)));
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
    searchVideosChanID(id, nextPage)
      .then(data => processData(data, id))
      .then(res => dispatch(setChannleMoreVidoeData(res)));
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
