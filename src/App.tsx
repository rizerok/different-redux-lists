import React from 'react';
import './App.css';
import { BrowserRouter, BrowserRouterProps, Link, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/home';
import ReduxOnly from './pages/redux-only';
import CustomReduxList from './pages/custom-redux-list';
import RtkList from './pages/rtk-list';
import RtkQueryList from './pages/rtk-query-list';
import CustomReduxItem from './pages/custom-redux-list/item';

const routerProps: BrowserRouterProps = {};
if (process.env.PUBLIC_URL && process.env.NODE_ENV === 'production') {
  routerProps.basename = process.env.PUBLIC_URL;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter {...routerProps}>
        <div className="App">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/redux-only">Redux only</Link>
            </li>
            <li>
              <Link to="/custom-redux-list">Custom redux list</Link>
            </li>
            <li>
              <Link to="/rtk-list">Rtk list</Link>
            </li>
            <li>
              <Link to="/rtk-query-list">Rtk query list</Link>
            </li>
          </ul>
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route
              path="/redux-only"
              element={<ReduxOnly/>}
            />
            <Route
              path="/custom-redux-list"
              element={<CustomReduxList/>}
            />
            <Route
              path="/custom-redux-list/:id"
              element={<CustomReduxItem/>}
            />
            <Route
              path="/rtk-list"
              element={<RtkList/>}
            />
            <Route
              path="/rtk-query-list"
              element={<RtkQueryList/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
