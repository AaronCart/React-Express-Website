import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Header from './Header';
import MyProfile from './MyProfile';
import Posting from './Posting';
import { getUser, removeUser } from "../data/repository";

export default function App() {
  const [user, setUser] = useState(getUser());

  // Update state when a user signs in
  const signinUser = (user) => {
    setUser(user);
  };

  // Reset state when user signs out
  const signoutUser = () => {
    removeUser();
    setUser(null);
  };

  return (
    <div>
      <Router> {/*Router and Switch are used to display only the specified elements on the single page.*/}
        <Header /> {/* Navbar and Header will be displayed at all times so they aren't inside the Switch tags. */}
        <Navbar user={user} signoutUser={signoutUser} />
        <Switch>
          <Route exact path="/"> {/* Route path for Home class */}
            <Home />
          </Route>
          <Route path="/signup"> {/* Route path for SignUp class */}
            <SignUp signinUser={signinUser} />
          </Route>
          <Route path="/signin"> {/* Route path for SignIn class */}
            <SignIn signinUser={signinUser} />
          </Route>
          <Route path="/profile"> {/* Route Path for My Profile class */}
            <MyProfile user={user} />
          </Route>
          <Route path="/posts">
            <Posting user={user} />
          </Route>
        </Switch>
        <Footer /> {/* Footer will be displayed at all times so it the footer tag is outside of the Switch tags. */}
      </Router>
    </div>
  );
}
