import Page from 'src/components/Page';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Tabs,
  Tab,
  Divider,
  colors
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Header from './Header';
import Model from './Model';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

function ModelHome() {
  const classes = useStyles();
  const [model, setModel] = useState(null);
  const tabs = [
    { value: 'models', label: 'Models' }
  ];

  useEffect(() => {
    let mounted = true;

    const fetchModel = () => {
      axios.get('/api/models').then((response) => {
        if (mounted) {
          setModel(response.data.model);
        }
      });
    };

    fetchModel();

    return () => {
      mounted = false;
    };
  }, []);

  if (!model) {
      return null;
    }

  return (
    <Page
      className={classes.root}
      title="Models"
    >
      <Container maxWidth="lg">
        <Header />
        <Tabs
          className={classes.tabs}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              disabled
            />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          <Model models={model.models} />
        </div>
      </Container>
    </Page>
  );
}

export default ModelHome;
