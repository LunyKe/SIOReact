import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Quiz from './Quiz.jsx';
import Layout from './Layout.jsx';
import Home from './Home.jsx';
import Nopage from './Nopage.jsx';
import Input from './Input.jsx';
import Cars from './Cars.jsx';
import Movies from './Movies.jsx';
import GeoQuiz from './GeoQuiz.jsx';
import Todo from './Todo.jsx';
import Mysic from './Mysic.jsx';
import Album from './Album.jsx';

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <browserRouter basename={"/First-React"}>
      <App />
    </browserRouter>
  </React.StrictMode>
);





function App() {
  const [playlistTracks, setPlaylistTracks] = useState(JSON.parse(localStorage.getItem("playlist")) || [])
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} />}>
        <Route index element={<Home />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="input" element={<Input />} />
        <Route path="cars" element={<Cars />} />
        <Route path="movies" element={<Movies />} />
        <Route path="geoQuiz" element={<GeoQuiz />} />
        <Route path="todo" element={<Todo />} />
        <Route path="mysic" element={<Mysic />} />
        <Route path="mysic/album/:id" element={<Album playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} />} />
        <Route path="*" element={<Nopage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
