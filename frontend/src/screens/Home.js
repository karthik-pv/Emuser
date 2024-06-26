import React from "react";
import Header from "../components/header";
import {Link} from "react-router-dom"
import Footer from "../components/footer";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center ">
            <Header />
            <div className="mt-10 w-1/2 bg-white text-center rounded-full h-1/2">
                <h1 className="text-4xl pt-10 underline">Introduction</h1>
                    <p className="p-10 pb-15">
                        Welcome to Emuser ...... an AI based music recommendation system that
                        determines your emotional state from your text input and queries suitable
                        emotionally supportive music from the database.<br></br>
                        My initial attempt involved training my own model using the random forest
                        classifier and a dataset I obtained from kaggle. However due to the lack of 
                        quality of the dataset I was unable to go through with it.<br></br>
                        I have currently implemented an API from hugging face to carry out the 
                        emotion detection.<br></br>
                        I will be redefining this web app very soon.....when I train my own model....
                        until then...happy listening
                    </p>
                <div className="pt-5"></div>
            </div>
            <Link to='/main'>
             <button className="bg-green-500 rounded-full p-5 mt-10 text-2xl transition duration-300 ease-in-out transform hover:scale-105">Continue</button>
            </Link>
            <Footer/>
        </div>
    );
};

export default Home;
