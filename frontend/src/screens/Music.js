import React ,{useEffect , useState} from "react";
import Header from "../components/header";
import axios from "axios"
import Typist from "react-typist";
import { EmotionProvider, useEmotionContext } from "../context/EmotionContext";
import { useGenreContext } from "../context/GenreContext";
import { useNavigate } from "react-router-dom";

const Music = () => {
    
    const navigate = useNavigate()

    const [emotionStatement , setEmotionStatement] = useState('')

    const [musicLink , setMusicLink] = useState('')

    const { EmotionContextValue , updateEmotionContextValue} = useEmotionContext()
    const { GenreContextValue , updateGenreContextValue } = useGenreContext()

    const fetchStatement = async() => {
        const response = await axios.post('http://127.0.0.1:5000/getStatement', {"emotion" : EmotionContextValue})
        const resStatement = response.data.statement
        setEmotionStatement(resStatement)
    }

    const fetchMusic = async() => {
        const songResponse = await axios.post('http://127.0.0.1:5000/getSong',{"emotion" : EmotionContextValue  , "genre" : GenreContextValue})
        const songLink = songResponse.data.link
        alert(songLink)
    }
    
    useEffect(()=>{
        if(EmotionContextValue===''){
            navigate('/')
        }
        fetchStatement()
        fetchMusic()
    },[])

    return (
        <div className="flex flex-col text-center items-center justify-center">
            <Header/>
            <p className="p-10 text-4xl text-white w-1/2">{emotionStatement}</p> 
                
        </div>
    )
}

export default Music