import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { verifyUser } from "../data/repository";

export default function SignIn(props) {
    const history = useHistory();
    const [fields, setFields] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null);

    // Generic input change handler
    const handleInputChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = await verifyUser(fields.email, fields.password);

        if (user === null) {
            // Login failed, reset password field to blank and set error message
            setFields({ ...fields, password: "" });
            setErrorMessage("Email and/or password invalid, please try again.");
            return;
        }

        // Set user state
        props.signinUser(user);

        // Navigate to the profile page on successful Sign In
        history.push("/profile");
    };

    return (
        <div className="container">
            <h1 className="text-center my-3"><b>Sign In Page</b></h1>
            <h5 className="text-center">Don't have an account? <a href="/signup"><u>Click here to Sign Up!</u></a></h5>
            <form className="mx-5 formLabel" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" className="form-control borderInput" id="email"
                        value={fields.email} onChange={handleInputChange} placeholder="Enter Email"
                        required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" className="form-control borderInput" id="password"
                        value={fields.password} onChange={handleInputChange}
                        placeholder="Enter Password" required></input>
                </div>
                {errorMessage !== null &&
                    <div className="form-group">
                        <span className="text-danger">{errorMessage}</span>
                        {/* If the user uses the wrong email or password then the error message will 
                            show up and the form will not be submitted */}
                    </div>
                }
                <button type="submit" className="btn btn-primary btn-lg mt-2 mb-5">Sign In</button>
            </form>
        </div>
    );
}
