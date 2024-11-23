import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import { useNavigate } from 'react-router-dom';
import { useGenreContext } from "../context/GenreContext";
import { useEmotionContext } from "../context/EmotionContext";
import { baseURL } from "../api/Urls";
import depp from "../assets/depp.jpeg";
import sparrow from "../assets/sparrow.jpeg";
import Footer from "../components/footer";

const Genre = () => {
    const navigate = useNavigate();
    const { GenreContextValue, updateGenreContextValue } = useGenreContext();
    const { EmotionContextValue } = useEmotionContext();

    const [displayImg, setImg] = useState(depp);
    const [genresList, setGenresList] = useState([]);
    const [genre, setGenre] = useState(GenreContextValue);
    const [loading, setLoading] = useState(true);

    const onGenreSelect = (event) => {
        setGenre(event.target.value);
        updateGenreContextValue(event.target.value);
        setImg(sparrow);
    };

    const fetchGenreList = async () => {
        const response = await axios.get(baseURL + '/getGenreList');
        setGenresList(response.data.list);
        setLoading(false);
    };

    const Proceed = () => {
        if (GenreContextValue === '') {
            alert('Please select a genre');
        } else {
            navigate('/music');
        }
    };

    useEffect(() => {
        if (EmotionContextValue === '') {
            navigate('/main');
        }
        fetchGenreList();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16">
            <Header />
            <div className="flex flex-wrap justify-center pt-10 gap-3">
                {loading ? (
                    <p className="p-10 text-2xl sm:text-4xl text-white w-full">Loading...</p>
                ) : (
                    genresList.map((genre, index) => (
                        <button
                            key={index}
                            className="bg-white rounded-full p-3 sm:p-4 text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105 w-full sm:w-1/3 lg:w-1/5 mb-3"
                            value={genre}
                            onClick={onGenreSelect}
                        >
                            {genre}
                        </button>
                    ))
                )}
            </div>
            <div className="mt-10 text-white">
                <p className="text-xl sm:text-3xl pb-3">The genre you have selected is:</p>
                <span className="text-2xl sm:text-4xl lg:text-5xl">{genre === '' ? '.....' : genre}</span>
            </div>
            <img src={displayImg} alt="Genre Illustration" className="mt-5 w-64 sm:w-80 md:w-96 lg:w-[400px]" />
            <button
                className="bg-green-500 rounded-full px-6 py-3 mt-10 text-lg sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105"
                onClick={Proceed}
            >
                Get Music
            </button>
            <Footer />
        </div>
    );
};

export default Genre;
