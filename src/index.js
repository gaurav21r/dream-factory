import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from 'react';

import {createTheme, ThemeProvider} from '@mui/material'

import ProjectView from "./ProjectView/ProjectView";
import HomeView from './HomeView/HomeView';
import SearchView from "./SearchView/SearchView";
import ItemView from "./ItemView/ItemView";
import ProjectsView from "./ProjectsView/ProjectsView";
import {firestore} from './firebase';
import fuseInstance from './data/search';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { App } from '@capacitor/app';



const theme = createTheme({
  palette: {
    primary: {
      main: '#FFCA28'
    }
  },
  shape: {
    borderRadius: 6
  },
  typography: {
    fontFamily: [
      'Proxima Nova Condensed',
      'Roboto Condensed',
      'sans-serif'
    ].join(','),
    fontSize: 12
  }
})
theme.spacing(1);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView firestore={firestore} />,
    errorElement: <HomeView firestore={firestore} />
  }, 
  {
    path: '/projects',
    element: <ProjectsView firestore={firestore} />
  },
  {
    path: '/search',
    element: <SearchView firestore={firestore} fuseInstance={fuseInstance} />
  }, {
    path: '/project/:projectId',
    element: <ProjectView firestore={firestore} />
  }, {
    path: '/item/:itemId',
    element: <ItemView firestore={firestore} />
  }

]);

// Only for Android app.
App.addListener('backButton', data => {
  window.history.back()
});

root.render(
  
  <StrictMode>
    <ThemeProvider theme={theme}>
    {/* <ThemeContext.Provider value="dark"> */}
      <RouterProvider router={router} />
      {/* <ProjectView /> */}
      {/* <HomeView firestore={firestore} /> */}
      {/* <SearchView /> */}
    {/* </ThemeContext.Provider> */}
    </ThemeProvider>
  </StrictMode>
);
