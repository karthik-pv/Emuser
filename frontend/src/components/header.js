import React from "react";
import {Typewriter} from 'react-simple-typewriter'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    
    const goToHome = () => {
        navigate('/')
    }

    return (    
        <div className="pt-10 pb-10 text-center text-6xl text-white cursor-pointer">
            <Typewriter words={['Emuser']}/>
        </div>
    )
}

export default Header