import React, { useState, useRef, useReducer } from 'react';
import { makeStyles } from '@material-ui/styles';
import { indigo, pink } from '@material-ui/core/colors';
import { Card, Divider, Chip, Input, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

const chipReducer = (initialState, action) => {
  switch (action.type) {
    case 'ADD_KEYWORD':
      return {
        ...initialState,
        keyword: [...initialState.keyword, action.payload]
      };
    case 'DELETE_KEYWORD':
      const deletedKeyword = [...initialState.keyword].filter(
        keyword => keyword != action.payload
      );
      return {
        ...initialState,
        keyword: deletedKeyword
      };
    default:
      return initialState;
  }
};

const useStyles = makeStyles(theme => ({
  keywords: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  chips: {
    padding: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(1)
  },
  chipmodel: {
    backgroundColor: indigo[300]
  },
  chipkeyword: {
    backgroundColor: pink[300]
  },
  filterButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '35px'
  },
  searchButton: {
    padding: '3px',
    height: '30px',
    marginRight: theme.spacing(1)
  }
}));

const Filter = ({ model, setVideoList }) => {
  const [chips, chipsDispatch] = useReducer(chipReducer, {
    keyword: []
  });
  const inputRef = useRef(null);
  const classes = useStyles();

  const enterSearchHandler = event => {
    const currentValue = inputRef.current.value;
    if (
      event.key === 'Enter' &&
      currentValue &&
      !chips.keyword.includes(currentValue)
    ) {
      chipsDispatch({ type: 'ADD_KEYWORD', payload: currentValue });
      inputRef.current.value = '';
    }
  };

  const clickSearchHandler = () => {
    const currentValue = inputRef.current.value;

    if (currentValue && !chips.keyword.includes(currentValue)) {
      chipsDispatch({ type: 'ADD_KEYWORD', payload: currentValue });
      inputRef.current.value = '';
    }
  };

  const deleteChipHandler = (key, data) => {
    chipsDispatch({ type: 'DELETE_KEYWORD', payload: data });
  };

  const searchButtonHandler = async () => {
    try {
      const result = await axios.post(
        `http://localhost:8000/datamanagement/${model}/`,
        { videoInfo: chips.keyword }
      );
      setVideoList(result.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <div className={classes.keywords}>
        <SearchIcon
          onClick={clickSearchHandler}
          className={classes.searchIcon}
        />
        <Input
          inputRef={inputRef}
          disableUnderline
          onKeyUp={enterSearchHandler}
          placeholder="Enter a keyword"
        />
      </div>
      <Divider />
      <div className={classes.chips}>
        {Object.keys(chips).map(key =>
          chips[key].map(item => (
            <Chip
              className={`${classes.chip} ${classes[`chip${key}`]}`}
              key={item}
              label={item}
              onDelete={() => deleteChipHandler(key, item)}
              color="secondary"
            />
          ))
        )}
      </div>
      <Divider />
      <div className={classes.filterButtonContainer}>
        <Button
          className={classes.searchButton}
          size="small"
          variant="outlined"
          color="primary"
          onClick={searchButtonHandler}
        >
          Search
        </Button>
      </div>
    </Card>
  );
};

export default Filter;
