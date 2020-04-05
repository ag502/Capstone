import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { Drawer, Grid, Typography, Button, Hidden } from '@material-ui/core';
import { LiveTv, Check, Close, DeleteOutline } from '@material-ui/icons';
// import LiveTvIcon from '@material-ui/icons/LiveTv';
// import CheckIcon from '@material-ui/icons/Check';
// import CloseIcon from '@material-ui/icons/Close';
// import DeleteIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

function TableEditBar({
  selected,
  className,
  onMarkPaid,
  onMarkUnpaid,
  onDelete,
  onView,
  ...rest
}) {
  const classes = useStyles();
  const open = selected.length > 0;
  const requestVideoUrl = selected.join('+');

  return (
    <Drawer
      anchor="bottom"
      open={open}
      PaperProps={{ elevation: 1 }}
      variant="persistent"
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Grid alignItems="center" container spacing={2}>
          <Hidden smDown>
            <Grid item md={3}>
              <Typography color="textSecondary" variant="subtitle1">
                {selected.length} selected
              </Typography>
            </Grid>
          </Hidden>
          <Grid item md={6} xs={12}>
            <div className={classes.actions}>
              {/* <Button onClick={onMarkPaid}>
                <CheckIcon className={classes.buttonIcon} />
                Mark Paid
              </Button>
              <Button onClick={onMarkUnpaid}>
                <CloseIcon className={classes.buttonIcon} />
                Mark Unpaid
              </Button> */}
              <Button
                onClick={onView}
                component={RouterLink}
                to={`/data-process/${requestVideoUrl}`}
              >
                <LiveTv className={classes.buttonIcon} />
              </Button>
              <Button onClick={onDelete}>
                <DeleteOutline className={classes.buttonIcon} />
                Delete
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );
}

TableEditBar.propTypes = {
  className: PropTypes.string,
  onDelete: PropTypes.func,
  onMarkPaid: PropTypes.func,
  onMarkUnpaid: PropTypes.func,
  selected: PropTypes.array.isRequired
};

export default TableEditBar;
