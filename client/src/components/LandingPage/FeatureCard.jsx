import React from 'react'

import chat from "../../assets/chat.svg"

import "./FeatureCard.css"

function FeatureCard(props) {
    return (
        <div className='feature-card'>
            <div className="feature-image-container">
                <img src={props.image} alt="" />
            </div>
            <div className="feature-title">
                <h2>{props.title}</h2>
            </div>
        </div>
    )
}

export default FeatureCard