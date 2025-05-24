import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Loader from "react-js-loader"



function Mysic() {
    const [value, setValue] = useState("")
    const [search, setSearch] = useState("")
    const [albums, setAlbums] = useState([])

    let color = "#213547"

    useEffect(() => {
        fetchAPI(search)
    }, [search])

    function fetchAPI(searchTerm) {
        fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=album`)
        .then(res => res.json())
        .then(data => {
            if (data.results) {
                setAlbums(data.results)
            }
        })
        .catch(err => console.log(err)) 
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">🙊 Mysic 🙊</h1>
                <p className="text-lg text-gray-600 mb-4">Application de musique</p>
    
                {/* Barre de recherche */}
                <div className="flex gap-4 mb-6">
                    <input 
                        className="border-2 border-pink-500 rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-pink-500" 
                        type="text" 
                        placeholder="Chercher un album ..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button 
                        className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
                        onClick={() => setSearch(value)}
                    >
                        🔍 Rechercher
                    </button>
                </div>
    
                {/* Loader */}
                {(search && !albums) && (
                    <div className="flex justify-center items-center mt-4">
                        <Loader type="spinner-default" bgColor="#213547" color="#213547" title="Chargement..." size={100} />
                    </div>
                )}
    
                {/* Résultats de recherche */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
                    {albums && albums.map(album => (
                        <div key={album.collectionId} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                            <Link to={`album/${album.collectionId}`}>
                                <img src={album.artworkUrl100.replace("100x100", "300x300")} alt="Album Cover" className="rounded-lg w-24 h-24 mb-3" />
                            </Link>
                            <h3 className="text-lg font-semibold text-gray-800">{album.artistName} - {album.collectionName}</h3>
                            <h4 className="text-sm text-gray-500">{new Date(album.releaseDate).toLocaleDateString("fr-FR")}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default Mysic;