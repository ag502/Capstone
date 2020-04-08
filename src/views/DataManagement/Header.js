import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

const Header = ({ classes }) => (
  <Breadcrumbs aria-label="breadcrumb" className={classes.header}>
    <Link color="inherit" href="/">
      Home
    </Link>
    <Link color="inherit" href="/getting-started/installation/">
      Core
    </Link>
    <Typography color="textPrimary">Breadcrumb</Typography>
  </Breadcrumbs>
);

export default Header;
