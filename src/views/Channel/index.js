import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchVideosChanID } from 'src/utils/axios';
import { setChannelVideoData } from 'src/actions';
import { useLocation } from 'react-router';
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
      searchKeword: keyword,
      nexPageToken: nextPage,
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

  return (
    <Videos
      nextPage={nextPage}
      keyword={keyword}
      loadNextVideoData={() => {}}
      videoItems={videoItems}
    />
  );
};

export default ChannelPage;
