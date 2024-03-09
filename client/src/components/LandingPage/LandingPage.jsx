import React from 'react'
import { useNavigate } from 'react-router-dom';
import FeatureCard from "./FeatureCard"
import "./LandingPage.css"

import AI from "../../assets/ai.svg"
import chat from "../../assets/chat.svg"
import folder from "../../assets/folder.svg"
import notes from "../../assets/notes.svg"
import organise from "../../assets/organise.svg"
import think from "../../assets/think.svg"
import pdfs from "../../assets/pdfs.svg"


function LandingPage() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className='home-page'>
            <div className="landing-navbar">
                <h1>Scribble</h1>
                <button onClick={handleClick}>Login</button>
            </div>

            <div className="hero-section">
                <div className="hero-info">
                    <h1>Scribble</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum facilis molestiae vitae laudantium quos aliquam rem alias voluptas, ipsum voluptatibus!</p>
                    <button onClick={handleClick}>Get Started</button>
                </div>
                <div className="image-container">
                    <img src={AI} alt="" />
                </div>
            </div>

            <div className="feature-section">
                <div className="feature-heading">
                    <h1>Why Use Scribble ?</h1>
                </div>

                <div className="feature-card-wrapper">
                    <FeatureCard image={notes} title="Easy Note Taking" />
                    <FeatureCard image={folder} title="Organise Your Notes" />
                    <FeatureCard image={pdfs} title="Upload Your PDFs" />
                    <FeatureCard image={chat} title="AI to answer your questions" />
                    <FeatureCard image={organise} title="Ai" />
                    <FeatureCard image={think} title="Ai" />
                </div>
            </div>

            <div className="footer">
                <h1>Scribble</h1>
                <p>© 2024 Scribble. All rights reserved</p>
            </div>
        </div>
    )
}

export default LandingPage