import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import QueueMusicIcon from '@mui/icons-material/QueueMusic';


function Album( { playlistTracks, setPlaylistTracks }) {	
    const [album, setAlbum] = useState(null)
 //   const [playlistTracks, setPlaylistTracks] = useState([])
    // const [currentExtract, setCurrentExtract] = useState(null)
    // const [playingTrackId, setPlayingTrackId] = useState(null)

    const { id } = useParams()
    let apiLink = `https://itunes.apple.com/lookup?id=${id}&entity=song`

    console.log(id)

    useEffect(() => {
        fetch(apiLink) 
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setAlbum(data.results)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        localStorage.setItem("playlist", JSON.stringify(playlistTracks))
    }, [playlistTracks]) 

    function addToPlaylist(track) {
        setPlaylistTracks([...playlistTracks, track])
    }

    

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">L'album 👇</h2>
    
                {/* Affichage de l'album principal */}
                {album && (
                    <div className="album-cover bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <h3 className="text-xl font-semibold text-gray-800">{album[0].artistName} - {album[0].collectionName}</h3>
                        <h4 className="text-md text-gray-500">{new Date(album[0].releaseDate).toLocaleDateString("fr-FR")}</h4>
                        <img 
                            src={album[0].artworkUrl100.replace("100x100", "500x500")} 
                            alt="Album Cover" 
                            className="rounded-lg w-64 h-64 mt-4"
                        />
                    </div>
                )}
    
                {/* Liste des pistes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full max-w-4xl">
                    {album && album.map(track => (
                        track.kind && (
                            <div key={track.trackId} className="track bg-pink-500 p-4 rounded-lg shadow-md text-white flex flex-col items-center">
                                
                                <h3 className="text-md font-semibold text-gray-800">{track.trackNumber} - {track.trackName}</h3>
                                <p className="text-sm text-gray-500">{track.trackTimeMillis} ms</p>
                                
                                {/* Lecteur audio intégré */}
                                <audio controls className="w-full max-w-xs mt-4 rounded-lg ">
                                    <source src={track.previewUrl} type="audio/mpeg" />
                                    Votre navigateur ne supporte pas l'élément audio.
                                </audio>
                                <button onClick={() => addToPlaylist(track)}>< QueueMusicIcon /></button>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </>
    );
}

export default Album;