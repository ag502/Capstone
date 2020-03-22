import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, Divider, Chip, Input, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import MultiSelector from './MultiSelector';

const selector = [
  { label: 'Model', options: ['null', 'Shadowing', 'FaceAPI'] }
];

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
  const [chips, setChips] = useState([]);
  const inputRef = useRef(null);
  const classes = useStyles();

  const enterSearchHandler = event => {
    const currentValue = inputRef.current.value;
    if (
      event.key === 'Enter' &&
      currentValue &&
      !chips.includes(currentValue)
    ) {
      setChips(prevChips => [...prevChips, currentValue]);
      inputRef.current.value = '';
    }
  };

  const clickSearchHandler = () => {
    const currentValue = inputRef.current.value;

    if (currentValue && !chips.includes(currentValue)) {
      setChips(prevChips => [...prevChips, currentValue]);
      inputRef.current.value = '';
    }
  };

  const optionSelectHandler = option => {
    if (chips.includes(option)) {
      setChips(prevChips => prevChips.filter(chip => chip !== option));
    } else {
      setChips(prevChips => [...prevChips, option]);
    }
  };

  const deleteChipHandler = data => {
    setChips(prevChips => prevChips.filter(chip => chip !== data));
  };

  const searchButtonHandler = () => {
    if (chips.length !== 0) {
      console.log(chips);
      axios
        .get(`http://127.0.0.1:8000/preprocessor/?model_tag=${chips[0]}`)
        .then(res => setVideoList(res.data));
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
        {chips.map(chip => (
          <Chip
            className={classes.chip}
            key={chip}
            label={chip}
            onDelete={() => deleteChipHandler(chip)}
          />
        ))}
      </div>
      <Divider />
      <div className={classes.filterButtonContainer}>
        <div>
          {selector.map(option => (
            <MultiSelector
              key={option.label}
              label={option.label}
              options={option.options}
              selectedItems={chips}
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
