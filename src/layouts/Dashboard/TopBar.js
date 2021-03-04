import React, { useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  AppBar,
  ClickAwayListener,
  colors,
  Hidden,
  IconButton,
  Input,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Popper,
  Select,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsPopover from 'src/components/NotificationsPopover';
import { setLoadError, setVideoData } from 'src/actions';
import ChatBar from './ChatBar';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    backgroundColor: colors.blueGrey[900]
  },

  flexGrow: {
    flexGrow: 1
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 480,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginLeft: theme.spacing(2),
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    marginLeft: '10px',
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  trialIcon: {
    marginRight: theme.spacing(1)
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  chatButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  }
}));

const BootstrapInput = withStyles(theme => ({
  input: {
    height: '20px',
    borderRadius: 4,
    backgroundColor: 'inherit',
    color: 'white',
    border: '1px solid #3F51B5',
    fontSize: 16,
    padding: '1px 26px 1px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

const popularSearches = [
  // 검색시 가장 많이 검색한 내용
  '한달살기'
];

function SearchTypeSelector({ searchType, setSearchType }) {
  const classes = useStyles();

  const handleChange = event => {
    setSearchType(event.target.value);
    console.log(searchType);
  };

  return (
    <div>
      <Select
        onChange={handleChange}
        input={<BootstrapInput />}
        value={searchType}
        displayEmpty
      >
        <MenuItem value={1}>Key Word</MenuItem>
        <MenuItem value={2}>Video ID</MenuItem>
        <MenuItem value={3}>Channel ID</MenuItem>
      </Select>
    </div>
  );
}

function TopBar({ onOpenNavBarMobile, className, ...rest }) {
  const classes = useStyles();
  const history = useHistory();
  const searchRef = useRef(null);
  const searchValueRef = useRef(null);
  const dispatch = useDispatch();
  const notificationsRef = useRef(null);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openChatBar, setOpenChatBar] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [searchType, setSearchType] = useState(1);
  const { pathname } = useLocation();

  const handleLogout = () => {
    history.push('/auth/login');
    // dispatch(logout());
  };

  const handlePricingModalOpen = () => {
    setPricingModalOpen(true);
  };

  const handlePricingModalClose = () => {
    setPricingModalOpen(false);
  };

  const handleChatBarOpen = () => {
    setOpenChatBar(true);
  };

  const handleChatBarClose = () => {
    setOpenChatBar(false);
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  const handleSearchChange = event => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchPopover) {
        setOpenSearchPopover(true);
      }
    } else {
      setOpenSearchPopover(false);
    }
  };

  const clickSearchHandler = event => {
    if (searchValue) {
      try {
        window.scrollTo(0, 0);
        dispatch(setVideoData(searchValue, searchType));
      } catch (error) {
        dispatch(setLoadError(error));
      } finally {
        setSearchValue('');
      }
    }
  };

  const enterSearchHandler = event => {
    if (event.key === 'Enter' && searchValue) {
      try {
        window.scrollTo(0, 0);
        dispatch(setVideoData(searchValue, searchType));
      } catch (error) {
        dispatch(setLoadError(error));
      } finally {
        setSearchValue('');
      }
    }
  };

  const handleSearchPopoverClose = () => {
    setOpenSearchPopover(false);
  };

  let inputMessage = 'Input your Key Word';

  if (searchType === 2) {
    inputMessage = 'Input your Video ID1, Video ID2, ...';
  } else if (searchType === 3) {
    inputMessage = 'Input your Channel ID';
  }

  console.log('Render TopBar');
  return (
    <AppBar {...rest} className={clsx(classes.root, className)} color="primary">
      <Toolbar>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={onOpenNavBarMobile}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <RouterLink to="/overview">
          <img alt="Jenesis" src="/images/name.png" />
          {/* <div >Jenesis</div> */}
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          {pathname === '/overview' && (
            <div className={classes.search} ref={searchRef}>
              <SearchTypeSelector
                searchType={searchType}
                setSearchType={setSearchType}
              />
              <Input
                className={classes.searchInput}
                disableUnderline
                ref={searchValueRef}
                onChange={handleSearchChange}
                onKeyDown={enterSearchHandler}
                placeholder={inputMessage}
                value={searchValue}
              />
              <SearchIcon
                className={classes.searchIcon}
                onClick={clickSearchHandler}
              />
            </div>
          )}
          <Popper
            anchorEl={searchRef.current}
            className={classes.searchPopper}
            open={openSearchPopover}
            transition
          >
            <ClickAwayListener onClickAway={handleSearchPopoverClose}>
              <Paper className={classes.searchPopperContent} elevation={3}>
                <List>
                  {popularSearches.map(search => (
                    <ListItem
                      button
                      key={search}
                      onClick={handleSearchPopoverClose}
                    >
                      <ListItemIcon>
                        <SearchIcon />
                      </ListItemIcon>
                      <ListItemText primary={search} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Hidden>
      </Toolbar>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
      <ChatBar onClose={handleChatBarClose} open={openChatBar} />
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
