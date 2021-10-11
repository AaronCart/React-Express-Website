import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-sm bg-info navbar-dark">
            <ul className="navbar-nav big-font mr-auto mx-5 pl-5">
                <li className="nav-item pr-5">
                    <Link className="nav-link text-light bg-info" to="/">Home</Link>
                </li>
                {props.user !== null &&
                    // If a user is signed in then "My Profile" and "Posts" links will be displayed in the navbar
                    <React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-link text-light bg-info" to="/profile">My Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light bg-info mx-5" to="/posts">Posts</Link>
                        </li>
                    </React.Fragment>
                    // React Fragment is used to display multiple <li> tags
                }
            </ul>
            <ul className="navbar-nav big-font">
                {props.user === null ?
                    // If a user is not signed in then they will see the "Sign Up" and "Sign In" links in the navbar
                    <React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-link text-light bg-info" to="/signup">Sign Up</Link>
                        </li>
                        <li className="nav-item mx-5 pr-5">
                            <Link className="nav-link text-light bg-info" to="/signin">Sign In</Link>
                        </li>
                    </React.Fragment>
                    :
                    // If the user is signed in then they will see a success message and a "Sign Out" link
                    <React.Fragment>
                        <li className="nav-item">
                            <span className="nav-link text-light bg-info"><u>You are now logged in!</u></span>
                        </li>
                        <li className="nav-item mx-5 pr-5">
                            <Link className="nav-link text-light bg-info" to="/signin" onClick={props.signoutUser}>Sign Out</Link>
                        </li>
                    </React.Fragment>
                }
            </ul>
            {/* Sign Up, Sign In, Welcome and Sign Out list items are in their own <ul> tag so that they are 
                shifted towards the right side of the navbar */}
        </nav>
    );
}
