import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar.js';
import Feed from './components/feed/Feed.js';
import Widgets from './components/widgets/Widgets.js';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUsers } from './services/formServices';

function App() {
  const loggedIn = useSelector(state => state.loggedIn);
  const dispatch = useDispatch();
  getUsers().then(res => {
    dispatch({ type: "ADD_ALLUSERS", payload: res })
  });
  return (
    <div className="app">
      {loggedIn ? null : <Redirect to='/' />}
      <div className="wrapper">

        <Sidebar />

        <Feed />

        <Widgets />

      </div>
    </div>
  )
}

export default App
