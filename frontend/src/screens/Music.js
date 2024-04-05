import React ,{useEffect , useState} from "react";
import Header from "../components/header";
import axios from "axios"
import { useEmotionContext } from "../context/EmotionContext";
import { useGenreContext } from "../context/GenreContext";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../api/Urls";
import Footer from "../components/footer";

const Music = () => {
    
    const navigate = useNavigate()

    const [loading , setLoading] = useState(true);

    const [emotionStatement , setEmotionStatement] = useState('')

    const [musicSongLink , setMusicSongLink] = useState('')
    const [musicPlaylistLink , setMusicPlaylistLink] = useState('')

    const [detArtistName , setDetArtistName] = useState('')
    const [detSongName, setDetSongName] = useState('')
    const [albumCover , setAlbumCover] = useState('')

    const { EmotionContextValue , updateEmotionContextValue} = useEmotionContext()
    const { GenreContextValue , updateGenreContextValue } = useGenreContext()

    const fetchStatement = async () => {
        const response = await axios.post(baseURL+'/getStatement', {"emotion" : EmotionContextValue})
        const resStatement = response.data.statement
        await setEmotionStatement(resStatement)
    }

    const fetchMusic = async () => {
        const songResponse = await axios.post(baseURL+'/getSong',{"emotion" : EmotionContextValue  , "genre" : GenreContextValue})
        const songLink = songResponse.data.link
        setMusicSongLink(songLink)
        const playlistResponse = await axios.post(baseURL+'/getPlaylist',{"emotion" : EmotionContextValue , "genre" : GenreContextValue})
        const playlistLink = playlistResponse.data.link
        setMusicPlaylistLink(playlistLink)
        setLoading(false)
    }

    const fetchSongDetails = async () => {
        try {
            const detailsRes = await axios.post(baseURL+'/getTrackDeets', {"link": musicSongLink});
            console.log(detailsRes); 

            const { artists, name, album } = detailsRes.data.track_details;
    
            const artistNames = artists.map(artist => artist.name).join(', ');
            setDetArtistName(artistNames);
            setDetSongName(name);
            setAlbumCover(album.images[0].url);
        } catch (error) {
            console.error('Error fetching song details:', error.message);
        }
    };

    const onceMore = () => {
        updateEmotionContextValue('')
        updateGenreContextValue('')
        navigate('/')
    }
    
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
            { loading ? 
            <p className="p-10 text-4xl text-white w-1/2">Loading...</p> 
            :
            <p className="p-10 text-4xl text-white w-1/2">{emotionStatement}</p>
            }
            <div className="flex flex-row">
                <button className="bg-red-500 rounded-full p-4 mt-2 text-2xl mr-10 transition duration-300 ease-in-out transform hover:scale-105" onClick={fetchSongDetails}>I don't like surprises</button>
                <a href={`${musicSongLink}`} target="_blank">
                    <button className="bg-green-500 rounded-full p-4 mt-2 text-2xl mr-10 transition duration-300 ease-in-out transform hover:scale-105">Surprise Me</button>
                </a>
                <a href={`${musicPlaylistLink}`} target="_blank">
                <button className="bg-yellow-500 rounded-full p-4 mt-2 text-2xl transition duration-300 ease-in-out transform hover:scale-105">Get Playlist</button>
                </a>
            </div> 
            <div className="text-white pt-5">
                <p>{detSongName}</p><br></br>
                <p>{detArtistName}</p>
                <img src={albumCover} width={300}></img>
            </div>
            <button className="bg-white rounded-full p-4 mt-2 text-2xl transition duration-300 ease-in-out transform hover:scale-105" onClick={onceMore}>Once More</button>
            <Footer/>
        </div>
    )
}

export default Music