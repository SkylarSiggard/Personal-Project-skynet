import React from 'react';
import './App.css';
import Lander from './components/Lander/Lander'
import Header from './components/Header/Header'
import Create from './components/Create/Create'
import List from './components/List/List'

function App() {
  return (
    <div className="App">
      <Lander/>
      <Header/>
      <Create/>
      <List/>
    </div>
  );
}

export default App;
