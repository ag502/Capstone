/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
// import React from 'react';
// import { colors } from '@material-ui/core';
// import BarChartIcon from '@material-ui/icons/BarChart';
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// import ChatIcon from '@material-ui/icons/ChatOutlined';
// import CodeIcon from '@material-ui/icons/Code';
// import DashboardIcon from '@material-ui/icons/DashboardOutlined';
// import ErrorIcon from '@material-ui/icons/ErrorOutline';
// import FolderIcon from '@material-ui/icons/FolderOutlined';
// import ListAltIcon from '@material-ui/icons/ListAlt';
// import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
// import MailIcon from '@material-ui/icons/MailOutlined';
// import PresentToAllIcon from '@material-ui/icons/PresentToAll';
// import PersonIcon from '@material-ui/icons/PersonOutlined';
// import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
// import SettingsIcon from '@material-ui/icons/SettingsOutlined';
// import ViewConfigIcon from '@material-ui/icons/ViewComfy';
// import ListIcon from '@material-ui/icons/List';
// import Label from 'src/components/Label';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import DataProcessingIcon from '@material-ui/icons/Gavel';
import DataManageIcon from '@material-ui/icons/Storage';
import Models from '@material-ui/icons/FeaturedVideo';

export default [
  {
    subheader: 'Menu',
    items: [
      {
        title: '홈',
        href: '/overview',
        icon: HomeIcon
      },
      {
        title: '데이터 전처리',
        href: '/data-process',
        icon: DataProcessingIcon
      },
      {
        title: '데이터 관리',
        href: '/data-management',
        icon: DataManageIcon
      },
      {
        title: 'Model',
        href: '/social-feed',
        icon: Models,
        items: [
          {
            title: '1.',
            href: '/1'
          },
          {
            title: '2.',
            href: '/2'
          },
          {
            title: '3.',
            href: '/3'
          }
        ]
      }
    ]
  }
];
