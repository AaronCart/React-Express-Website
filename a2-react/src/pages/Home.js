import React, { Component } from 'react';
import background from './background.png';
import { Link } from "react-router-dom";
// Image Source: https://unsplash.com/photos/SYTO3xs06fU

export default function Home(props) {

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm text-center pt-4 verdana">
                    <h1><b>Welcome to <span className="yellow">V</span>IBE <span className="yellow">C</span>HECK!</b></h1>
                    <p className="mt-5 largePara">VIBE CHECK is a student-made social networking application that allows
                        all students to interact with each other, no matter what course they are enrolled in.
                        Students will be able to set up a personal profile, make posts, share images and reply to
                        other users.</p>
                    <p>Feeling anxious or down during lockdown?<br />Want to meet and interact with
                        new people?</p>

                    {props.user === null ?
                        // If a user is not logged in, then this link will direct them to the Sign Up Page
                        
                        <p className="largePara">Well simply <Link to="/signup"><u>click here</u></Link> to get started today!</p>
                        :
                        // If a user is logged in, then this link will direct them to their Profile Page
                        <p className="largePara">Well simply <Link to="/profile"><u>click here</u></Link> to get started today!</p>
                    }
                </div>
                <div className="col-sm">
                    <img src={background} alt="Background" width="100%" height="auto"></img>
                </div>
            </div>
        </div>
    );
}