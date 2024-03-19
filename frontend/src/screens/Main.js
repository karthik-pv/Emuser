import Header from "../components/header";
import axios from "axios";
import React , {useState , useEffect} from "react";
import { Link } from "react-router-dom";
import { useEmotionContext } from "../context/EmotionContext";

const Main = () => {

    const [text, setText] = useState("")
    const [emotion, setEmotion] = useState(".....")
    const [emotionList , setEmotionList] = useState([])
    const {EmotionContextValue , updateEmotionContextValue} = useEmotionContext();

    const handleTextData = (event) => {
        setText(event.target.value)
    }

    const onAnalyse = async () => {
        const response = await axios.post('http://127.0.0.1:5000/getEmotion' , {"text" : text})
        const resEmotion = response.data.emotion
        setEmotion(resEmotion)
        updateEmotionContextValue(resEmotion)
    }

    const fetchEmoList = async () => {
        const response = await axios.get('http://127.0.0.1:5000/getEmoList')
        setEmotionList(response.data.list)
    }

    const onOverride = async () => {
        const selectedEmotion = document.getElementById("emotionSelect").value;
        setEmotion(selectedEmotion)
        await updateEmotionContextValue(selectedEmotion)
    }

    useEffect(()=>{
        fetchEmoList()
    },[])

    return (
        <div className="flex flex-col items-center">
            <Header/>
            <h1 className="text-white pb-10">Describe the last event that you feel affected you emotionally and briefly describe your feelings</h1>
            <textarea className="w-1/2 p-4 border-2 rounded-md" value={text} onChange={handleTextData}></textarea>
            <button className="bg-green-500 rounded-full p-3 mt-10 text-2xl" onClick={onAnalyse} >Analyse</button>
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
                <button className="bg-red-700 rounded-full p-3 mt-10 text-2xl mr-10" onClick={onOverride}>Override</button>  
                <Link to='/genre'>
                    <button className="bg-green-500 rounded-full p-3 mt-10 text-2xl">Proceed</button>
                </Link>  
            </div>
            <div className="pt-5">
                <a className="text-white underline" href="https://github.com/karthik-pv">Developed by Jojo</a>
            </div>
        </div>
    );
}

export default Main;