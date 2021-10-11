import React, { Component } from 'react';
import { getUsers } from "../data/repository";
import profilePic from "./profile.png";
// Image Source: https://www.pngitem.com/middle/iTxxxxm_blank-profile-picture-circle-hd-png-download/

class MyProfile extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
      date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    // Displays joined date

    this.state = {
      currentUser: getUsers(),
      joinDate: date
    };
    // For accessing the name and email from local storage
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div className="container text-center verdana mb-5">
        <h1 className="mt-3">My Profile</h1>
        <img src={profilePic} alt="Blank Profile Pic.png" width="11%" height="auto" />
        <h3 className="mt-2"><b>Welcome {currentUser.name1}!</b></h3>
        <p className="largePara">Your email address: {this.props.email}</p>
        <p>Date Joined: {this.state.joinDate}</p>
      </div>
    );
  }
}

export default MyProfile;