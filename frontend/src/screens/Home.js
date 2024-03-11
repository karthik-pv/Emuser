import React from "react";
import Header from "../components/header";
import Typist from "react-typist";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center ">
            <Header />
            <div className="mt-10 w-1/2 bg-white text-center rounded-full h-1/2">
                <h1 className="text-4xl pt-10">Disclaimer</h1>
                <Typist cursor={{ show: false}}>
                    <p className="p-10 pb-15">
                        Welcome to Emuser ...... an AI based music recommendation system that
                        determines your emotional state from your text input and queries suitable
                        emotionally supportive music from the database.<br></br>
                        My initial attempt involved training my own model using the random forest
                        classifier and a dataset I obtained from kaggle. However due to the lack of 
                        quality of the dataset I was unable to go through with it.<br></br>
                        I have currently implemented an API from hugging face to carry out the 
                        emotion detection.
                    </p>
                </Typist>
                <div className="pt-5"></div>
            </div>
             <button className="bg-green-500 rounded-full p-5 mt-10 text-2xl">Continue</button>
            <div className="pt-5">
                <a className="text-white underline" href="https://www.ultimate-guitar.com/">Developed by Jojo</a>
            </div>
        </div>
    );
};

export default Home;
