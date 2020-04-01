import React, { useState, useRef, useReducer } from 'react';
import { makeStyles } from '@material-ui/styles';
import { indigo, pink } from '@material-ui/core/colors';
import { Card, Divider, Chip, Input, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import MultiSelector from './MultiSelector';

const selector = [
  { label: 'Model', options: ['null', 'Shadowing', 'FaceAPI'] }
];

const chipReducer = (initialState, action) => {
  switch (action.type) {
    case 'ADD_MODEL':
      return {
        ...initialState,
        model: [action.payload]
      };
    case 'CLEAR_MODEL':
      return {
        ...initialState,
        model: []
      };
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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '35px'
  },
  searchButton: {
    padding: '3px',
    height: '30px',
    marginRight: theme.spacing(1)
  }
}));

const Filter = ({ setVideoList }) => {
  const [chips, chipsDispatch] = useReducer(chipReducer, {
    model: [],
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

  const optionSelectHandler = option => {
    if (chips.model.includes(option)) {
      chipsDispatch({ type: 'CLEAR_MODEL' });
    } else {
      chipsDispatch({ type: 'ADD_MODEL', payload: option });
    }
  };

  const deleteChipHandler = (key, data) => {
    if (key === 'model') {
      chipsDispatch({ type: 'CLEAR_MODEL' });
    } else if (key === 'keyword') {
      chipsDispatch({ type: 'DELETE_KEYWORD', payload: data });
    }
  };

  const searchButtonHandler = () => {
    // if (chips.length !== 0) {
    //   console.log(chips);
    //   axios
    //     .get(`http://127.0.0.1:8000/preprocessor/?model_tag=${chips[0]}`)
    //     .then(res => setVideoList(res.data));
    // }
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
        <div>
          {selector.map(option => (
            <MultiSelector
              key={option.label}
              label={option.label}
              options={option.options}
              selectedItems={chips.model}
              selectHandler={optionSelectHandler}
            />
          ))}
        </div>
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
