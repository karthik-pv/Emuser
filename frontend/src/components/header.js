import React from "react";
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    
    const goToHome = () => {
        navigate('/')
    }

    return (    
        <div className="pt-10 pb-10 text-center">
            <h1 className="text-6xl text-white cursor-pointer" onClick={goToHome}>Emuser</h1>
        </div>
    )
}

export default Header