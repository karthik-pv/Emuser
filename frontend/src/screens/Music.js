import React, { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";
import { useEmotionContext } from "../context/EmotionContext";
import { useGenreContext } from "../context/GenreContext";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../api/Urls";
import Footer from "../components/footer";

const Music = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [emotionStatement, setEmotionStatement] = useState('');
    const [musicSongLink, setMusicSongLink] = useState('');
    const [musicPlaylistLink, setMusicPlaylistLink] = useState('');
    const [detArtistName, setDetArtistName] = useState('');
    const [detSongName, setDetSongName] = useState('');
    const [albumCover, setAlbumCover] = useState('');

    const { EmotionContextValue, updateEmotionContextValue } = useEmotionContext();
    const { GenreContextValue, updateGenreContextValue } = useGenreContext();

    const getBackgroundColor = () => {
        const emotionColors = {
            joy: '#FFD700',
            sorrow: '#FFDAB9',
            love: '#FFC0CB',
            neutral: '#8FBC8F',
            anger: '#9B4D96',
            fear: 'grey'
        };
        return emotionColors[EmotionContextValue.toLowerCase()] || '#000000';
    };

    const fetchStatement = async () => {
        const response = await axios.post(baseURL + '/getStatement', { "emotion": EmotionContextValue });
        setEmotionStatement(response.data.statement);
    };

    const fetchMusic = async () => {
        const songResponse = await axios.post(baseURL + '/getSong', { "emotion": EmotionContextValue, "genre": GenreContextValue });
        setMusicSongLink(songResponse.data.link);
        const playlistResponse = await axios.post(baseURL + '/getPlaylist', { "emotion": EmotionContextValue, "genre": GenreContextValue });
        setMusicPlaylistLink(playlistResponse.data.link);
        setLoading(false);
    };

    const fetchSongDetails = async () => {
        try {
            const detailsRes = await axios.post(baseURL + '/getTrackDeets', { "link": musicSongLink });
            const { artists, name, album } = detailsRes.data.track_details;
            setDetArtistName(artists.map(artist => artist.name).join(', '));
            setDetSongName(name);
            setAlbumCover(album.images[0].url);
        } catch (error) {
            console.error('Error fetching song details:', error.message);
        }
    };

    const onceMore = () => {
        updateEmotionContextValue('');
        updateGenreContextValue('');
        navigate('/');
    };

    useEffect(() => {
        if (!EmotionContextValue || !GenreContextValue) {
            navigate('/');
        } else {
            fetchStatement();
            fetchMusic();
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 lg:px-16 text-center" style={{ backgroundColor: getBackgroundColor() }}>
            <Header textColor="black" />

            {loading ? (
                <p className="p-10 text-2xl sm:text-4xl text-white w-full sm:w-1/2">Loading...</p>
            ) : (
                <p className="p-5 text-2xl sm:text-4xl text-black w-full sm:w-1/2">{emotionStatement}</p>
            )}

            <div className="flex flex-wrap justify-center gap-4 mt-6">
                <button className="bg-red-500 rounded-full px-4 py-3 sm:px-6 sm:py-4 text-lg sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105" onClick={fetchSongDetails}>
                    I don't like surprises
                </button>

                <a href={musicSongLink} target="_blank" rel="noopener noreferrer">
                    <button className="bg-green-500 rounded-full px-4 py-3 sm:px-6 sm:py-4 text-lg sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105">
                        Surprise Me
                    </button>
                </a>

                <a href={musicPlaylistLink} target="_blank" rel="noopener noreferrer">
                    <button className="bg-yellow-500 rounded-full px-4 py-3 sm:px-6 sm:py-4 text-lg sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105">
                        Get Playlist
                    </button>
                </a>
            </div>

            <div className="text-white pt-5 sm:pt-8">
                <p className="text-lg sm:text-xl">{detSongName}</p>
                <p className="text-md sm:text-lg">{detArtistName}</p>
                {albumCover && <img src={albumCover} alt="Album Cover" className="mt-5 w-48 sm:w-64 lg:w-80 rounded-lg shadow-lg" />}
            </div>

            <button className="bg-white rounded-full px-6 py-3 mt-10 text-lg sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105" onClick={onceMore}>
                Once More
            </button>

            <Footer />
        </div>
    );
};

export default Music;
