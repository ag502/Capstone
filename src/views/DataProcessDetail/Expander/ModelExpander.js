import React, { useState } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VideoList from './VideoList';

const ModelExpander = ({ modelTag, videos }) => {
  const [expanded, setExpanded] = useState(false);

  const expandHandler = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel
        expanded={expanded === modelTag}
        onChange={expandHandler(modelTag)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          {modelTag}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <VideoList videos={videos} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default ModelExpander;
