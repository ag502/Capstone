import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  label: {
    marginTop: theme.spacing(1)
  },
  shareButton: {
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2)
  },
  shareIcon: {
    marginRight: theme.spacing(1)
  },
  applyButton: {
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

function Header({ project, className, ...rest }) {
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Browse models
          </Typography>
          <Typography component="h1" gutterBottom variant="h3">
            Test your model
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
