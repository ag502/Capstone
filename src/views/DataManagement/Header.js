import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Breadcrumbs, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Header = ({ classes, pathInfo }) => (
  <Breadcrumbs aria-label="breadcrumb" className={classes.header}>
    <Link component={RouterLink} color="inherit" to="/data-management">
      Model
    </Link>
    {pathInfo.slice(2).map((path, idx, arr) => {
      let component = null;
      let locPathName = path;
      if (path.includes('&')) {
        const [videoId, startTime, endTime] = path.split('&');
        locPathName = `${videoId}_${startTime}_${endTime}`;
      }

      if (idx === arr.length - 1) {
        component = <Typography key={idx}>{locPathName}</Typography>;
      } else {
        component = (
          <Link
            key={idx}
            component={RouterLink}
            color="inherit"
            to={`/data-management/${locPathName}`}
          >
            {locPathName}
          </Link>
        );
      }
      return component;
    })}
  </Breadcrumbs>
);

export default Header;
