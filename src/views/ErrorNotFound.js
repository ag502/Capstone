import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, useTheme, useMediaQuery } from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center'
  },
  imageContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    maxWidth: '100%',
    width: 560,
    maxHeight: 300,
    height: 'auto'
  }
}));

function Error401() {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Page className={classes.root} title="Error 401">
      <Typography align="center" variant={mobileDevice ? 'h4' : 'h1'}>
        검색결과가 없습니다.
      </Typography>
      <Typography align="center" variant="subtitle2">
        검색어를 다시 확인해 주세요.
      </Typography>
      <div className={classes.imageContainer}>
        <img
          alt="Under development"
          className={classes.image}
          src="/images/ResultNotFound.jpg"
        />
      </div>
    </Page>
  );
}

export default Error401;
