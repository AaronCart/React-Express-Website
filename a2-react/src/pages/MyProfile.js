import React from "react";
import { Link } from "react-router-dom";
import profilePic from "./profile.png";
// Image Source: https://www.pngitem.com/middle/iTxxxxm_blank-profile-picture-circle-hd-png-download/

export default function MyProfile(props) {
  return (
    <div className="container text-center verdana mb-5">
      <h1 className="mt-3 text-primary bOutline"><b>My Profile</b></h1>
      <img src={profilePic} alt="Blank Profile Pic.png" width="11%" height="auto" />

      {/* Display User's Name */}
      <h3 className="mt-2"><b>Welcome {props.user.fName}!</b></h3>

      {/* Display User's Email */}
      <p className="largePara">Your email address: {props.user.email}</p>

      {/* Display the date that the user signed up on */}
      <p>Date Joined: {props.user.createdAt}</p>

      {/* Link to Edit Profile Page is displayed as a button here */}
      <Link className="btn btn-success btn-lg" to={`/edit/${props.user.email}`}>Click Here to Edit Your Profile</Link>
    </div>
  );
}
