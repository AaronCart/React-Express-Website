import React from 'react';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: null };
  }
  // Setting state for email property

  signinUser = (email) => {
    this.setState({ email: email });
  }
  // Updating state for email when a user signs in

  signoutUser = () => {
    this.setState({ email: null });
  }
  // Resetting state when user logs out

  render() {
    return (
      <div>
        <Router> {/*Router and Switch are used to display only the specified elements on the single page.*/}
          <Header /> {/* Navbar and Header will be displayed at all times so they aren't inside the Switch tags. */}
          <Navbar email={this.state.email} signoutUser={this.signoutUser} />
          <Switch>
            <Route exact path="/"> {/* Route path for Home class */}
              <Home />
            </Route>
            <Route path="/signup"> {/* Route path for SignUp class */}
              <SignUp />
            </Route>
            <Route path="/signin" render={props => (
              <SignIn {...props} signinUser={this.signinUser} />
            )} /> {/* Route path for SignIn class */}
            <Route path="/profile">
              <MyProfile email={this.state.email} /> {/* Route Path for My Profile class */}
            </Route>
            <Route path="/posts">
              <Posting email={this.state.email} />
            </Route>
          </Switch>
          <Footer /> {/* Footer will be displayed at all times so it the footer tag is outside of the Switch tags. */}
        </Router>
      </div>
    );
  }
}

export default App;
