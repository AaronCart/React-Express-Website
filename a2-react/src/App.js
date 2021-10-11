import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import './App.css';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Header from './pages/Header';
import MyProfile from './pages/MyProfile';
import Posting from './pages/Posting';
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
