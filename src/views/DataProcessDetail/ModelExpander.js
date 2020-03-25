import React, { useState } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ModelExpander = () => {
  const [expanded, setExpanded] = useState(false);

  const expandHandler = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel
        expanded={expanded === 'null'}
        onChange={expandHandler('null')}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          null
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>HI</ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

export default ModelExpander;
