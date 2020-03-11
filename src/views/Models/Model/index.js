import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import ModelCard from './ModelCard';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Models({ models, className, ...rest }) {
  const classes = useStyles();

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      {models.map((model) => (
        <Grid
          item
          key={model.id}
          lg={4}
          xs={12}
        >
          <ModelCard model={model} />
        </Grid>
      ))}
    </Grid>
  );
}

Models.propTypes = {
  className: PropTypes.string,
  models: PropTypes.array.isRequired
};

export default Models;
