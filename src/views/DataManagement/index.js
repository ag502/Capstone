import React, { useState, useEffect } from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Header from './Header';
import Home from './Pages/Home';
import VideoGroup from './Pages/VideoGroup/index';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
  },
  header: {
    marginBottom: theme.spacing(3)
  }
}));

const DataManagement = ({ route }) => {
  const classes = useStyles();
  const { pathname } = useLocation();
  const [currentLoc, setCurrentLoc] = useState([]);

  useEffect(() => {
    const location = pathname.split('/');
    setCurrentLoc(location);
  }, [pathname]);

  return (
    <Page className={classes.root}>
      <Container maxWidth={false}>
        <Header classes={classes} pathInfo={currentLoc} />
        {/* <Switch>
          <Route exact path="/data-management" component={Home} />
          <Route exact path="/data-management/:model" component={VideoGroup} />
        </Switch> */}
        {renderRoutes(route.routes)}
      </Container>
    </Page>
  );
};

export default DataManagement;
