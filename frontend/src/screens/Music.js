import React ,{useEffect , useState} from "react";
import Header from "../components/header";
import axios from "axios"
import { useEmotionContext } from "../context/EmotionContext";
import { useGenreContext } from "../context/GenreContext";
import { useNavigate } from "react-router-dom";

const Music = () => {
    
    const navigate = useNavigate()

    const [emotionStatement , setEmotionStatement] = useState('')

    const [musicSongLink , setMusicSongLink] = useState('')
    const [musicPlaylistLink , setMusicPlaylistLink] = useState('')

    const [detArtistName , setDetArtistName] = useState('')
    const [detSongName, setDetSongName] = useState('')
    const [albumCover , setAlbumCover] = useState('')

    const { EmotionContextValue , updateEmotionContextValue} = useEmotionContext()
    const { GenreContextValue , updateGenreContextValue } = useGenreContext()

    const fetchStatement = async () => {
        const response = await axios.post('http://127.0.0.1:5000/getStatement', {"emotion" : EmotionContextValue})
        const resStatement = response.data.statement
        await setEmotionStatement(resStatement)
    }

    const fetchMusic = async () => {
        const songResponse = await axios.post('http://127.0.0.1:5000/getSong',{"emotion" : EmotionContextValue  , "genre" : GenreContextValue})
        const songLink = songResponse.data.link
        setMusicSongLink(songLink)
        const playlistResponse = await axios.post('http://127.0.0.1:5000/getPlaylist',{"emotion" : EmotionContextValue , "genre" : GenreContextValue})
        const playlistLink = playlistResponse.data.link
        setMusicPlaylistLink(playlistLink)
    }

    const fetchSongDetails = async () => {
        try {
            const detailsRes = await axios.post('http://127.0.0.1:5000/getTrackDeets', {"link": musicSongLink});
            console.log(detailsRes); // Log detailsRes to check its structure
    
            // Access track details from the correct property
            const { artists, name, album } = detailsRes.data.track_details;
    
            const artistNames = artists.map(artist => artist.name).join(', ');
            setDetArtistName(artistNames);
            setDetSongName(name);
            setAlbumCover(album.images[0].url);
        } catch (error) {
            console.error('Error fetching song details:', error.message);
        }
    };
    
    useEffect(()=>{
        if(EmotionContextValue===''){
            navigate('/')
        }
        if(GenreContextValue===''){
            navigate('/')
        }
        fetchStatement()
        fetchMusic()
    },[])

    return (
        <div className="flex flex-col text-center items-center justify-center">
            <Header/>
            <p className="p-10 text-4xl text-white w-1/2">{emotionStatement}</p>
            <div className="flex flex-row">
                <button className="bg-red-500 rounded-full p-4 mt-2 text-2xl mr-10" onClick={fetchSongDetails}>I don't like surprises</button>
                <a href={`${musicSongLink}`}>
                    <button className="bg-green-500 rounded-full p-4 mt-2 text-2xl mr-10">Surprise Me</button>
                </a>
                <a href={`${musicPlaylistLink}`}>
                <button className="bg-yellow-500 rounded-full p-4 mt-2 text-2xl">Get Playlist</button>
                </a>
            </div> 
            <div className="text-white pt-5">
                <p>{detSongName}</p><br></br>
                <p>{detArtistName}</p>
                <img src={albumCover} width={300}></img>
            </div>
            <div className="pt-5">
                <a className="text-white underline" href="https://github.com/karthik-pv">Developed by Jojo</a>
            </div>
        </div>
    )
}

export default Music