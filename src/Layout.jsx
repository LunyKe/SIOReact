import { Outlet, Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import PlayListDrawer from "./PlayListDrawer.jsx";

const Layout = ({playlistTracks, setPlaylistTracks}) => {
  return (
    <>
      {/* Barre de navigation */}
      <nav className="bg-gray-800 w-full text-white p-4 shadow-md">
        <div className="max-w-screen-lg mx-auto flex flex-wrap items-center justify-center gap-6">
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link
                to="/"
                className="px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-700 hover:text-gray-300"
              >
                🏠 Home
              </Link>
            </li>
            <li>
              <Link
                to="/quiz"
                className="px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-700 hover:text-gray-300"
              >
                ❓ Quiz
              </Link>
            </li>
            <li>
              <Link
                to="/input"
                className="px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-700 hover:text-gray-300"
              >
                ⌨️ Input
              </Link>
            </li>
            <li>
              <Link
                to="/cars"
                className="px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-700 hover:text-gray-300"
              >
                🚗 Cars
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-700 hover:text-gray-300"
              >
                🎬 Movies
              </Link>
            </li>
            <li>
              <Link
                to="/geoquiz"
                className="px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-700 hover:text-gray-300"
              >
                🌍 GeoQuiz
              </Link>
            </li>
            <li>
              <Link
                to="/todo"
                className="px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-700 hover:text-gray-300"
              >
                ✅ Todo
              </Link>
            </li>
            <li>
              <Link
                to="/mysic"
                className="px-4 py-2 rounded-lg transition duration-300 hover:bg-gray-700 hover:text-gray-300"
              >
                🎵 Mysic
              </Link>
            </li>
          </ul>
          <PlayListDrawer playlistTracks={playlistTracks} setPlaylistTracks={setPlaylistTracks} />
        </div>

      </nav>

      <Outlet />
    </>
  );
};

export default Layout;