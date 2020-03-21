import React, { useState, useRef } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  menuItem: {
    padding: 0
  },
  formControlLabel: {
    padding: theme.spacing(0.5, 2),
    width: '100%',
    margin: 0
  }
}));

const MutiSelector = ({ label, options, selectedItems, selectHandler }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef(null);
  const classes = useStyles();

  const menuOpenHandler = () => {
    setMenuOpen(true);
  };

  const menuCloseHandler = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <Button onClick={menuOpenHandler} ref={anchorRef}>
        {label}
      </Button>
      <Menu
        open={isMenuOpen}
        onClose={menuCloseHandler}
        anchorEl={anchorRef.current}
      >
        {options.map(option => (
          <MenuItem key={option} className={classes.menuItem}>
            <FormControlLabel
              className={classes.formControlLabel}
              control={
                <Checkbox
                  checked={selectedItems.includes(option)}
                  color="primary"
                  value={option}
                  onClick={event => selectHandler(event.target.value)}
                />
              }
              label={option}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MutiSelector;
