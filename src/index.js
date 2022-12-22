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
import {enableNetwork, disableNetwork} from 'firebase/firestore'
import fuseInstance from './data/search';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Change isSyncing State (that changes animation)
// Set Firestore to Online and check for data from the server
function syncFirestore () {
  console.log('Syncing');  
  enableNetwork(firestore);
  setTimeout(() => {
    disableNetwork(firestore)
  }, 5000)
}

syncFirestore();
setInterval(syncFirestore, 10000)

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
