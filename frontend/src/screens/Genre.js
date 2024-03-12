import React from "react";
import { useState , useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import {Link , useNavigate} from 'react-router-dom'
import { useGenreContext } from "../context/GenreContext";
import { useEmotionContext } from "../context/EmotionContext";
import depp from "../assets/depp.jpeg"
import sparrow from "../assets/sparrow.jpeg"

const Genre = () => {

    const navigate = useNavigate()

    const [displayImg , setImg] = useState(depp)
    const [genresList , setGenresList] = useState([])
    const [genre , setGenre] = useState('.....')

    const {GenreContextValue,updateGenreContextValue} = useGenreContext()
    const {EmotionContextValue , updateEmotionContextValue} = useEmotionContext()

    const onGenreSelect = (event) => {
        setGenre(event.target.value)
        updateGenreContextValue(event.target.value)
        setImg(sparrow)
    }

    const fetchGenreList = async() => {
        const response = await axios.get('http://127.0.0.1:5000/getGenreList')
        setGenresList(response.data.list)
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
                {genresList.map((genre, index) => (
                <button
                    key={index}
                    className="bg-white rounded-full p-4 mt-2 text-2xl"
                    style={{
                    flexBasis: 'calc(20% - 10px)', // 20% width with 10px margin
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
                <p className="text-white pt-7 pb-3 text-3xl">The genre you have selected is <span className="text-5xl">{genre}</span></p>
            </div>
            <img src={displayImg} width={400}></img>
            <Link to={'/music'}>
                <div>
                    <button className="bg-green-500 rounded-full p-3 mt-10 text-2xl">Get Music</button>
                </div>
            </Link>
            <div className="pt-2">
                <a className="text-white underline" href="https://github.com/karthik-pv">Developed by Jojo</a>
            </div>
        </div>

    )
}

export default Genre