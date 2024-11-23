import Header from "../components/header";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useEmotionContext } from "../context/EmotionContext";
import { baseURL } from "../api/Urls";
import Footer from "../components/footer";

const Main = () => {
    const { EmotionContextValue, updateEmotionContextValue } = useEmotionContext();
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [emotion, setEmotion] = useState(EmotionContextValue);
    const [emotionList, setEmotionList] = useState([]);

    const handleTextData = (event) => {
        setText(event.target.value);
    };

    const onAnalyse = async () => {
        const response = await axios.post(baseURL + '/getEmotion', { "text": text });
        const resEmotion = response.data.emotion;
        setEmotion(resEmotion);
        updateEmotionContextValue(resEmotion);
    };

    const fetchEmoList = async () => {
        const response = await axios.get(baseURL + '/getEmoList');
        setEmotionList(response.data.list);
    };

    const onOverride = async () => {
        const selectedEmotion = document.getElementById("emotionSelect").value;
        setEmotion(selectedEmotion);
        await updateEmotionContextValue(selectedEmotion);
    };

    const Proceed = () => {
        if (EmotionContextValue === '') {
            alert('Please select emotion');
        } else {
            navigate('/genre');
        }
    };

    useEffect(() => {
        fetchEmoList();
    }, []);

    return (
        <div className="flex flex-col items-center px-4 sm:px-8 lg:px-16 xl:px-32">
            <Header />
            <h1 className="text-white pb-10 text-center text-lg md:text-2xl lg:text-3xl">Describe the last event that you feel affected you emotionally and briefly describe your feelings</h1>
            <textarea className="w-full sm:w-3/4 lg:w-1/2 p-4 border-2 rounded-md mb-4" value={text} onChange={handleTextData} rows={5}></textarea>
            <button className="bg-green-500 rounded-full px-8 py-3 mt-6 text-lg sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105" onClick={onAnalyse}>Analyse</button>
            <div>
                <p className="text-white pt-10 text-center text-xl sm:text-2xl lg:text-3xl">You're predominantly feeling <span className="text-4xl sm:text-5xl">{emotion}</span></p>
            </div>
            <div className="flex flex-col sm:flex-row items-center pt-8">
                <p className="text-white">Override emotion prediction</p>
                <select id="emotionSelect" className="ml-2 h-10 px-2 mt-2 sm:mt-0 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500">
                    {emotionList.map((emotionValue, index) => (
                        <option key={index} value={emotionValue}>{emotionValue}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col sm:flex-row items-center pt-5">
                <button className="bg-red-700 rounded-full px-8 py-3 mt-6 sm:mt-0 sm:mr-4 text-lg sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105" onClick={onOverride}>Override</button>  
                <button className="bg-green-500 rounded-full px-8 py-3 mt-6 sm:mt-0 text-lg sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105" onClick={Proceed}>Proceed</button>
            </div>
            <Footer />
        </div>
    );
};

export default Main;
