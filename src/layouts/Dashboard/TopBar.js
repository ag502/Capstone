/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  colors,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Fade
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutline';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { searchVideos } from 'src/utils/axios';
// import axios from 'axios';
import NotificationsPopover from 'src/components/NotificationsPopover';
import PricingModal from 'src/components/PricingModal';
import { getVideoData, logout } from 'src/actions';
import ChatBar from './ChatBar';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
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

const popularSearches = [
  // 검색시 가장 많이 검색한 내용
  '한달살기'
];

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

  const clickSearchButton = event => {
    processVideoDate(searchValue)
      .then(result => {
        console.log(result);
        window.scrollTo(0, 0);
        dispatch(getVideoData(result));
      })
      .finally(() => setSearchValue(''));
  };

  const enterSearchButton = event => {
    if (event.key === 'Enter' && searchValue) {
      processVideoDate(searchValue)
        .then(result => {
          console.log(result);
          window.scrollTo(0, 0);
          dispatch(getVideoData(result));
        })
        .finally(() => setSearchValue(''));
    }
  };

  // Redux Thunk로 바꾸기 !!!!
  const processVideoDate = async keyword => {
    try {
      console.log('execute');
      const {
        data: {
          prevPageToken,
          nextPageToken,
          pageInfo: { totalResults },
          items
        }
      } = await searchVideos(keyword);
      return {
        searchKeyword: keyword,
        nextPageToken: nextPageToken === undefined ? '' : nextPageToken,
        prevPageToken: prevPageToken === undefined ? '' : prevPageToken,
        totalResults,
        items
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchPopoverClose = () => {
    setOpenSearchPopover(false);
  };

  // useEffect(() => {
  //   let mounted = true;
  //
  //   const fetchNotifications = () => {
  //     axios.get('#').then((response) => {
  //       if (mounted) {
  //         setNotifications(response.data.notifications);
  //       }
  //     });
  //   };
  //
  //   fetchNotifications();
  //
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

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
          <img alt="Logo" src="/images/logos/logo--white.svg" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          {pathname === '/overview' && (
            <div className={classes.search} ref={searchRef}>
              <SearchIcon
                className={classes.searchIcon}
                onClick={clickSearchButton}
              />
              <Input
                className={classes.searchInput}
                disableUnderline
                ref={searchValueRef}
                onChange={handleSearchChange}
                onKeyDown={enterSearchButton}
                placeholder="Input Your KeyWord"
                value={searchValue}
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
          <Button
            className={classes.trialButton}
            onClick={handlePricingModalOpen}
            variant="contained"
          >
            <LockIcon className={classes.trialIcon} />
            Trial expired
          </Button>
        </Hidden>
        {/* <IconButton */}
        {/*  className={classes.chatButton} */}
        {/*  color="inherit" */}
        {/*  onClick={handleChatBarOpen} */}
        {/* > */}
        {/*  <Badge */}
        {/*    badgeContent={6} */}
        {/*    color="secondary" */}
        {/*  > */}
        {/*    <PeopleIcon /> */}
        {/*  </Badge> */}
        {/* </IconButton> */}
        <Hidden mdDown>
          {/* <IconButton */}
          {/*  className={classes.notificationsButton} */}
          {/*  color="inherit" */}
          {/*  onClick={handleNotificationsOpen} */}
          {/*  ref={notificationsRef} */}
          {/* > */}
          {/*  <Badge */}
          {/*    badgeContent={notifications.length} */}
          {/*    classes={{ badge: classes.notificationsBadge }} */}
          {/*    variant="dot" */}
          {/*  > */}
          {/*    <NotificationsIcon /> */}
          {/*  </Badge> */}
          {/* </IconButton> */}
          <Button
            className={classes.logoutButton}
            color="inherit"
            onClick={handleLogout}
          >
            <InputIcon className={classes.logoutIcon} />
            Sign out
          </Button>
        </Hidden>
      </Toolbar>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
      <PricingModal onClose={handlePricingModalClose} open={pricingModalOpen} />
      <ChatBar onClose={handleChatBarClose} open={openChatBar} />
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default TopBar;
