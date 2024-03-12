import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from './screens/Home';
import Main from './screens/Main';
import Genre from './screens/Genre';
import Music from './screens/Music';
import { EmotionProvider } from './context/EmotionContext';
import { GenreProvider } from './context/GenreContext';

const App = () => {
return (
  <EmotionProvider>
    <GenreProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/main' element={<Main/>}/>
          <Route path='/genre' element={<Genre/>}/>
          <Route path='/music' element={<Music/>}/>
        </Routes>
      </Router>
    </GenreProvider>
  </EmotionProvider>
  );
}

export default App;
