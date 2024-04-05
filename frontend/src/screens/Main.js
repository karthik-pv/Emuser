import Header from "../components/header";
import axios from "axios";
import React , {useState , useEffect} from "react";
import { Link , useNavigate } from "react-router-dom";
import { useEmotionContext } from "../context/EmotionContext";
import { baseURL } from "../api/Urls";
import Footer from "../components/footer";

const Main = () => {

    const {EmotionContextValue , updateEmotionContextValue} = useEmotionContext();
    const navigate = useNavigate()
    const [text, setText] = useState("")
    const [emotion, setEmotion] = useState(EmotionContextValue)
    const [emotionList , setEmotionList] = useState([])
    
    const handleTextData = (event) => {
        setText(event.target.value)
    }

    const onAnalyse = async () => {
        const response = await axios.post(baseURL+'/getEmotion' , {"text" : text})
        const resEmotion = response.data.emotion
        setEmotion(resEmotion)
        updateEmotionContextValue(resEmotion)
    }

    const fetchEmoList = async () => {
        const response = await axios.get(baseURL+'/getEmoList')
        setEmotionList(response.data.list)
    }

    const onOverride = async () => {
        const selectedEmotion = document.getElementById("emotionSelect").value;
        setEmotion(selectedEmotion)
        await updateEmotionContextValue(selectedEmotion)
    }

    const Proceed = () => {
        if(EmotionContextValue ===''){
            alert('Please select emotion')
        }
        else{
            navigate('/genre')
        }
    }

    useEffect(()=>{
        fetchEmoList()
    },[])

    return (
        <div className="flex flex-col items-center">
            <Header/>
            <h1 className="text-white pb-10">Describe the last event that you feel affected you emotionally and briefly describe your feelings</h1>
            <textarea className="w-1/2 p-4 border-2 rounded-md" value={text} onChange={handleTextData}></textarea>
            <button className="bg-green-500 rounded-full p-3 mt-10 text-2xl transition duration-300 ease-in-out transform hover:scale-105" onClick={onAnalyse} >Analyse</button>
            <div>
                <p className="text-white pt-10 text-3xl">You're predominantly feeling <span className="text-5xl">{emotion}</span></p>
            </div>
            <div className="flex flex-row pt-10">
                <p className="text-white">Override emotion prediction</p>
                <select id="emotionSelect" className="ml-2 h-8">
                    {emotionList.map((emotionValue, index) => (
                        <option key={index} value={emotionValue}>{emotionValue}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-row pt-5">
                <button className="bg-red-700 rounded-full p-3 mt-10 text-2xl mr-10 transition duration-300 ease-in-out transform hover:scale-105" onClick={onOverride}>Override</button>  
                <button className="bg-green-500 rounded-full p-3 mt-10 text-2xl transition duration-300 ease-in-out transform hover:scale-105" onClick={Proceed}>Proceed</button>
            </div>
            <Footer/>
        </div>
    );
}

export default Main;