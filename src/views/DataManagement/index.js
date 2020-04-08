import React from 'react';
import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Pages/Home';

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

const DataManagement = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root}>
      <Container maxWidth={false}>
        <Header classes={classes} />
        <Switch>
          <Route path="/data-management" component={Home} />
        </Switch>
      </Container>
    </Page>
  );
};

export default DataManagement;
