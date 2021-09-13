import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar.js';
import Feed from './components/feed/Feed.js';
import Widgets from './components/widgets/Widgets.js';
function App() {
  return (
    <div className="app">
      <div className="wrapper">
        {/* Sidebar */}
        <Sidebar />

        {/* Feed */}
        <Feed />

        {/* Widgets */}
        <Widgets />

      </div>
    </div>
  )
}

export default App
