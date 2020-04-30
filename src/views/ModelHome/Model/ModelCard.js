import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Divider,
  Avatar
} from '@material-ui/core';

import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: blueGrey[50]
  },
  media: {
    height: 125
  },
  content: {
    paddingTop: 0
  },
  avatarContainer: {
    marginTop: -48,
    display: 'flex',
    paddingBottom: 10,
    justifyContent: 'center'
  },
  avatar: {
    height: 130,
    width: 130,
    backgroundColor: grey[50],
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: theme.palette.common.white
  },
  divider: {
    margin: theme.spacing(2, 0),
    backgroundColor: grey[400]
  }
}));

function ModelCard({ model, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardMedia className={classes.media} />
      <CardContent className={classes.content}>
        <div className={classes.avatarContainer}>
          <Avatar
            alt="Model"
            className={classes.avatar}
            component={RouterLink}
            src={model.avatar}
            to={model.link}
          />
        </div>
        <Typography
          align="center"
          component={RouterLink}
          display="block"
          to="/Testing-Model"
          variant="h6"
        >
          {model.name}
        </Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={1} />
      </CardContent>
    </Card>
  );
}

ModelCard.propTypes = {
  model: PropTypes.object.isRequired
};

export default ModelCard;
