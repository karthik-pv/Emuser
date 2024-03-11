import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from './screens/Home';
import Main from './screens/Main';
import Genre from './screens/Genre';

const App = () => {
return (
  <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/main' element={<Main/>}/>
      <Route path='/genre' element={<Genre/>}/>
    </Routes>
  </Router>
  );
}

export default App;
