import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Breadcrumbs, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Header = ({ classes, pathInfo }) => {
  console.log(pathInfo);
  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.header}>
      <Link component={RouterLink} color="inherit" to="/data-management">
        Model
      </Link>
      {pathInfo.slice(2).map((path, idx, arr) =>
        idx === arr.length - 1 ? (
          <Typography>{path}</Typography>
        ) : (
          <Link
            component={RouterLink}
            color="inherit"
            to={`/data-management/${path}`}
          >
            {path}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
};

export default Header;
