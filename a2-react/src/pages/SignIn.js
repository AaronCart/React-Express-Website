import React, { Component } from 'react';
import { verifyUser } from '../data/repository';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email: "",
                password: ""
            },
            errors: {}
        };
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const fields = this.state.fields;
        fields[name] = value;
        this.setState({ fields });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Prevents page from reloading
        const email = this.state.fields.email;
        const verified = verifyUser(email, this.state.fields.password);

        if (verified === true) {
            this.props.signinUser(email);

            this.props.history.push("/profile");
            return;
        }
        // If the user successfully signs in then they will be redirected to the profile page

        const fields = this.state.fields;
        fields.password = "";
        // Clears password field when form is submitted

        this.setState({
            fields: fields,
            errors: { "errorMessage": "Your email or password was incorrect, please try again" }
        });
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center my-3"><b>Sign In Page</b></h1>
                <h5 className="text-center">Don't have an account? <a href="/signup"><u>Click here to Sign Up!</u></a></h5>
                <form className="mx-5 formLabel" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" className="form-control borderInput" id="email"
                            value={this.state.fields.email} onChange={this.handleInputChange} placeholder="Enter Email"
                            required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" className="form-control borderInput" id="password"
                            value={this.state.fields.password} onChange={this.handleInputChange}
                            placeholder="Enter Password" required></input>
                    </div>
                    {this.state.errors["errorMessage"] &&
                        <div className="form-group">
                            <span className="text-danger">{this.state.errors["errorMessage"]}</span>
                            {/* If the user uses the wrong email or password then the error message will 
                            show up and the form will not be submitted */}
                        </div>
                    }
                    <button type="submit" className="btn btn-primary btn-lg mt-2 mb-5">Sign In</button>
                </form>
            </div>
        );
    }
}

export default SignIn