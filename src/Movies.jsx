import { useState, useEffect } from "react"

function Movies() { 
     
    const [search, setSearch] = useState("")
    const [value, setValue] = useState("")
    const [movies, setMovies] = useState([])
    const [favorites, setFavorites] = useState([])
    const [showFavorites, setShowFavorites] = useState(false)


    useEffect(() => {
        setShowFavorites(false)
        fetchApi(search)
    }, [search])


    function fetchApi(search) {
        let apiKey = "eed08b06"

        fetch(`https://omdbapi.com/?apiKey=${apiKey}&s=${search}`)
        .then(res => res.json())
        .then(data => {
            if (data.Search) {
                setMovies(data.Search)
            } 
        })
        .catch(err => console.log(err))
    }

    function searchMovies() {
        setShowFavorites(false)
        setSearch(value)
    }

    function addToFav(movie) {
        setFavorites([ ... favorites, movie])
    }

    function deleteFromFav(movie) {

        let arrayCopy = [ ... favorites ]

        let index = arrayCopy.indexOf(movie)

        arrayCopy.splice(index, 1)

        setFavorites(arrayCopy)
    }

    console.log("test")


    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">OMDB API : Movies app</h2>
      
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => searchMovies()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Rechercher
            </button>
            <button
              onClick={() => setShowFavorites(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Favoris
            </button>
          </div>
      
          {/* Liste des films quand on n'affiche pas les favoris */}
          <ul className="movies-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mb-8">
            {movies && showFavorites === false && movies.map((movie) => (
              <li
                key={movie.imdbID}
                className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-auto rounded mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">{movie.Title}</h2>
                <p className="text-gray-600">{movie.Year}</p>
                <button
                  onClick={() => addToFav(movie)}
                  className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                >
                  Ajouter aux favoris
                </button>
              </li>
            ))}
          </ul>
      
          {/* Liste des films favoris */}
          <ul className="fav-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {favorites && showFavorites === true && favorites.map((movie) => (
              <li
                key={movie.imdbID}
                className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-auto rounded mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">{movie.Title}</h2>
                <p className="text-gray-600">{movie.Year}</p>
                <button
                  onClick={() => deleteFromFav(movie)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Supprimer des favoris
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default Movies;