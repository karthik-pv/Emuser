import React from "react";
import Header from "../components/header";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16">
            <Header />
            <div className="mt-10 w-full sm:w-3/4 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white text-center rounded-full md:h-3/4 p-5 sm:p-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl pt-10 underline">Introduction</h1>
                <p className="mt-4 text-sm sm:text-base md:text-lg p-5 pb-10">
                    Welcome to Emuser ...... an AI-based music recommendation system that
                    determines your emotional state from your text input and queries suitable
                    emotionally supportive music from the database.<br />
                    My initial attempt involved training my own model using the random forest
                    classifier and a dataset I obtained from Kaggle. However, due to the lack of 
                    quality of the dataset, I was unable to go through with it.<br />
                    I have currently implemented an API from Hugging Face to carry out the 
                    emotion detection.<br />
                    I will be redefining this web app very soon... when I train my own model....
                    Until then... happy listening.
                </p>
                <div className="pt-5"></div>
            </div>
            <Link to='/main'>
                <button className="bg-green-500 rounded-full p-4 sm:p-5 mt-10 text-lg sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105">
                    Continue
                </button>
            </Link>
            <Footer />
        </div>
    );
};

export default Home;
