import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';
import OverviewView from './views/Overview';
import DataManagement from './views/DataManagement';

export default [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/overview" />
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('src/views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('src/views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('src/views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },

  /**
   * Page which has Navbar and Topbar
   */
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/channel/:id',
        exact: true,
        component: lazy(() => import('src/views/Channel'))
      },
      {
        path: '/data-process',
        exact: true,
        component: lazy(() => import('src/views/DataProcess'))
      },
      {
        path: '/data-management',
        component: DataManagement,
        routes: [
          {
            path: '/data-management',
            exact: true,
            component: lazy(() => import('src/views/DataManagement/Pages/Home'))
          },
          {
            path: '/data-management/:model',
            exact: true,
            component: lazy(() =>
              import('src/views/DataManagement/Pages/VideoGroup/index')
            )
          },
          {
            path: '/data-management/:model/:videoInfo',
            exact: true,
            component: lazy(() =>
              import('src/views/DataManagement/Pages/VideoList')
            )
          }
        ]
      },
      // {
      //   // models
      //   path: '/models-home',
      //   exact: true,
      //   component: lazy(() => import('src/views/ModelHome'))
      // },
      // {
      //   // TESTING models
      //   path: '/Testing-model/:modelName',
      //   exact: true,
      //   component: lazy(() => import('src/views/TestingModel'))
      // },
      // {
      //   // RealTime
      //   path: '/RealTime',
      //   exact: true,
      //   component: lazy(() => import('src/views/RealTime'))
      // },
      {
        path: '/data-process/:videoInfo',
        exact: true,
        component: lazy(() => import('src/views/DataProcessDetail'))
      },
      {
        path: '/overview',
        exact: true,
        component: OverviewView
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];
