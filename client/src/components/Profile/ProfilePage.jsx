import React from 'react'

import TemporaryDrawer from '../SideDrawer/Sidedrawer'


// import css
import "./ProfilePage.css"

function ProfilePage() {
    return (
        <div className='profile-page-wrapper'>
            <div className="navbar-home">
                <div className='left-navbar-home'>
                    <TemporaryDrawer />
                    <div className="title-navbar">
                        <h1>Scribble</h1>
                    </div>
                </div>

            </div>


            <div className="profile-card">
                <div className="cover-photo">
                    {/* <img src="https://i.imgur.com/KykRUCV.jpeg" className="profile" /> */}
                    <div className="profile">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="profile"><circle cx="16" cy="16" r="15" fill="#96d7ff"></circle><path fill="#86c3ef" d="M2.35,17A15,15,0,0,1,25.59,4.48a15,15,0,1,0-17.83,24A15,15,0,0,1,2.35,17Z"></path><path fill="#bf9e99" d="M16,6.09a7.31,7.31,0,0,0-7.3,7.3v15.1a1,1,0,0,0,.55.89,14.87,14.87,0,0,0,13.5,0,1,1,0,0,0,.55-.89V13.39A7.31,7.31,0,0,0,16,6.09Z"></path><path fill="#ff9797" d="M16,31a14.88,14.88,0,0,0,10.09-3.94.62.62,0,0,0,0-.23,6.65,6.65,0,0,0-6.3-4.54h-7.5A6.65,6.65,0,0,0,6,26.83a.62.62,0,0,0,0,.23A14.88,14.88,0,0,0,16,31Z"></path><path fill="#e47979" d="M6.51,27.39a6.67,6.67,0,0,1,6.3-4.54h7.51a6.62,6.62,0,0,1,4.38,1.68,6.65,6.65,0,0,0-4.95-2.24h-7.5A6.65,6.65,0,0,0,6,26.83a.62.62,0,0,0,0,.23c.18.17.38.32.57.48A.8.8,0,0,1,6.51,27.39Z"></path><path fill="#ecc5b4" d="M18.7,15.83H13.3a1,1,0,0,0-1,1V23.3a1,1,0,0,0,.45.83l2.7,1.8a1,1,0,0,0,1.1,0l2.7-1.8a1,1,0,0,0,.45-.83V16.83A1,1,0,0,0,18.7,15.83Z"></path><path fill="#ecc5b4" d="M21.5,12.77h-11a3,3,0,0,0,0,6h11a3,3,0,0,0,0-6Z"></path><path fill="#f4dab7" d="M18.46,9H13.54a3.49,3.49,0,0,0-3.49,3.49v3.36a5.95,5.95,0,0,0,11.9,0V12.46A3.49,3.49,0,0,0,18.46,9Z"></path><path fill="#d6b5b0" d="M23.2,12.66l.06,0A7.28,7.28,0,0,0,12.88,6.8a1.08,1.08,0,0,0,.06.77,9.75,9.75,0,0,0,2.94,3.58,8.84,8.84,0,0,0,5.28,1.76A9,9,0,0,0,23.2,12.66Z"></path><path fill="#d6b5b0" d="M19,6.76A7.29,7.29,0,0,0,8.7,13.39v.39a7.85,7.85,0,0,0,1.19.09,9.26,9.26,0,0,0,7-3.21A10.45,10.45,0,0,0,19,6.8Z"></path></svg>
                    </div>
                </div>

                <h3 className="profile-name">James Carson</h3>
                <div className="profile-about">
                    <p className="email">aditya@gmail.com</p>
                    <p className="phoneNumber">+91 66666666666</p>
                </div>
                <button className="profile-btn">Edit Profile</button>
                <button className="profile-btn">Forgot Password</button>
            </div>
        </div>
    )
}

export default ProfilePage