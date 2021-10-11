import React, { Component } from 'react';

class SignUp extends Component {
    documentData;
    constructor(props) {
        super(props);
        this.state = {
            name1: "",
            email: "",
            password: ""
        }
        // Initial state for name, email and password
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    // Allows inputs to be recorded and shown in the <input> text boxes

    handleFormSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('users', JSON.stringify(this.state));
        alert("Congrats! You can now Sign in with your email and password!");
    }
    // Prevents form from submitting and refreshing the page, instead the user's 
    // input will be stored in local storage and an alert will notify them if they signed up successfully

    componentDidMount() {
        // Lifecycle method
        this.documentData = JSON.parse(localStorage.getItem('users'));

        if (localStorage.getItem("users") !== null) {
            this.setState(this.documentData);
        }
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center my-3"><b>Fill in the form below to sign up to <span className="yellow">V
                </span>IBE <span className="yellow">C</span>HECK.</b></h2>
                <h5 className="text-center">Already have an account? <a href="/signin"><u>Click here to Sign in!</u></a></h5>

                <form className="mx-5" onSubmit={this.handleFormSubmit}>
                    <div className="form-group formLabel">
                        <label htmlFor="name1">Name:</label>
                        <input type="text" name="name1" className="form-control borderInput"
                            value={this.state.name1} onChange={this.handleChange} id="name1"
                            placeholder="Enter Name" required></input>
                    </div>
                    <div className="form-group formLabel">
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" className="form-control borderInput"
                            value={this.state.email} onChange={this.handleChange} id="email"
                            placeholder="Enter Email" pattern="\S+@\S+\.\S+"
                            // Regex for email from Week 4 lab code archive
                            title="Please enter a valid email address"
                            required></input>
                    </div>
                    <div className="form-group formLabel">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" className="form-control borderInput"
                            value={this.state.password} onChange={this.handleChange} id="password"
                            placeholder="Enter Password"
                            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
                            /* Regex for password that must be at least 6 characters long, include at 
                            least 1 number, 1 special character, 1 uppercase and 1 lowercase character */
                            title="Your Password does not follow the specified rules" required></input>
                    </div>
                    <p><span className="pwdRule">Password Rules:</span><br />Must be at least 6 characters long<br />Must contain at least 1 number
                        and 1 special character<br />Must contain at least 1 uppercase and 1 lowercase character</p>
                    <button type="submit" className="btn btn-primary btn-lg mb-5">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUp