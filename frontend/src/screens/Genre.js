import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import {Link , useNavigate} from 'react-router-dom'
import { useGenreContext } from "../context/GenreContext";
import { useEmotionContext } from "../context/EmotionContext";
import { baseURL } from "../api/Urls";
import depp from "../assets/depp.jpeg"
import sparrow from "../assets/sparrow.jpeg"
import Footer from "../components/footer";

const Genre = () => {

    const navigate = useNavigate()
    const {GenreContextValue,updateGenreContextValue} = useGenreContext()
    const [displayImg , setImg] = useState(depp)
    const [genresList , setGenresList] = useState([])
    const [genre , setGenre] = useState(GenreContextValue)
    const [loading , setLoading] = useState(true)

    const {EmotionContextValue , updateEmotionContextValue} = useEmotionContext()

    const onGenreSelect = (event) => {
        setGenre(event.target.value)
        updateGenreContextValue(event.target.value)
        setImg(sparrow)
    }

    const fetchGenreList = async() => {
        const response = await axios.get(baseURL+'/getGenreList')
        setGenresList(response.data.list)
        setLoading(false)
    }

    const Proceed = () => {
        if(GenreContextValue===''){
            alert('Please select genre')
        }
        else{
            navigate('/music')
        }
    }

    const maxElementsPerRow = 5

    useEffect(()=>{
        if(EmotionContextValue===''){
            navigate('/main')
        }
        fetchGenreList()
    },[])

    return (
        <div className="flex flex-col text-center items-center justify-center">
            <Header/>
            <div className="flex flex-wrap justify-center pt-10">
                {loading ?
                <p className="p-10 text-4xl text-white w-1/2">Loading...</p> 
                :
                genresList.map((genre, index) => (
                <button
                    key={index}
                    className="bg-white rounded-full p-4 mt-2 text-2xl transition duration-300 ease-in-out transform hover:scale-105"
                    style={{
                    flexBasis: 'calc(20% - 10px)',
                    marginRight: index % maxElementsPerRow === maxElementsPerRow - 1 ? '0' : '10px',
                    }}
                    value={genre}
                    onClick={onGenreSelect}
                >
                    {genre}
                </button>

                ))}
            </div>
            <div>
                <p className="text-white pt-7 pb-3 text-3xl">The genre you have selected is <span className="text-5xl">{genre==='' ? '.....' : genre}</span></p>
            </div>
            <img src={displayImg} width={400}></img>

            <button className="bg-green-500 rounded-full p-3 mt-10 text-2xl transition duration-300 ease-in-out transform hover:scale-105" onClick={Proceed}>Get Music</button>
                
            <Footer/>
        </div>

    )
}

export default Genre