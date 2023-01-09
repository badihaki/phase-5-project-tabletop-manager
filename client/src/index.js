import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import ErrorPage from './components/NotFound';
import UserPage from './components/User';
import NavigationBar from './components/Navigation';
import Home from './components/Home';
import SignUpLogIn from './components/SignUpLogIn';
import { UserProvider } from './components/context components/UserContext';
import Groups from './components/Groups';
import { GroupsProvider } from './components/context components/GroupsContext';
import GroupPage from './components/GroupPage';
import MessageBoard from './components/MessageBoard';
import { MessagesProvider } from './components/context components/MessagesContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/nav",
        element: <NavigationBar />,
      },
      {
        path: "/dashboard",
        element: <UserPage />
      },
      {
        path: "/groups",
        element: <Groups />
      },
      {
        path: "/groups/:id",
        element: <GroupPage />
      },
      {
        path: "/groups/:id/messages",
        element: <MessageBoard />
      }
    ],
  },
  // {
  //   path: "/user",
  //   element: <UserPage />
  // }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <GroupsProvider>
        <MessagesProvider>
          <RouterProvider router={router} />
        </MessagesProvider>
      </GroupsProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
