import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { findUser, createUser } from "../data/repository";

export default function SignUp(props) {
    const history = useHistory();

    // Initial State for name, email and password
    const [fields, setFields] = useState({
        fName: "", email: "", password: "", confirmPassword: ""
    });
    const [errors, setErrors] = useState({});

    // Generic change handler
    const handleInputChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form and if invalid do not contact API
        const { trimmedFields, isValid } = await handleValidation();
        if (!isValid)
            return;

        // Create user
        const user = await createUser(trimmedFields);

        // Set user state
        props.signinUser(user);

        // Navigate to the profile page so that the user is signed in after signing up
        history.push("/profile");
    };

    const handleValidation = async () => {
        const trimmedFields = trimFields();
        const currentErrors = {};

        let key = "email";
        let field = trimmedFields[key];
        if (await findUser(trimmedFields.email) !== null)
            currentErrors[key] = "That email is already registered";

        key = "confirmPassword";
        field = trimmedFields[key];
        if (field !== trimmedFields.password)
            currentErrors[key] = "Passwords do not match";

        setErrors(currentErrors);

        return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
    };

    const trimFields = () => {
        const trimmedFields = {};
        Object.keys(fields).map(key => trimmedFields[key] = fields[key].trim());
        setFields(trimmedFields);

        return trimmedFields;
    };

    return (
        <div className="container">
            <h2 className="text-center my-3"><b>Fill in the form below to sign up to <span className="yellow">V
            </span>IBE <span className="yellow">C</span>HECK.</b></h2>
            <h5 className="text-center">Already have an account? <a href="/signin"><u>Click here to Sign in!</u></a></h5>

            <form className="mx-5" onSubmit={handleSubmit}>
                <div className="form-group formLabel">
                    <label htmlFor="fName">Name:</label>
                    <input type="text" name="fName" className="form-control borderInput"
                        value={fields.fName} onChange={handleInputChange} id="fName"
                        placeholder="Enter Name" required></input>
                </div>
                <div className="form-group formLabel">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" className="form-control borderInput"
                        value={fields.email} onChange={handleInputChange} id="email"
                        placeholder="Enter Email" pattern="\S+@\S+\.\S+"
                        // Regex for email from Week 4 lab code archive
                        title="Please enter a valid email address"
                        required></input>
                    {errors.email &&
                        <div className="text-danger">{errors.email}</div>
                    }
                </div>
                <div className="form-group formLabel">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" className="form-control borderInput"
                        value={fields.password} onChange={handleInputChange} id="password"
                        placeholder="Enter Password"
                        pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
                        /* Regex for password that must be at least 6 characters long, include at 
                        least 1 number, 1 special character, 1 uppercase and 1 lowercase character */
                        title="Your Password does not follow the specified rules" required></input>
                </div>
                <div className="form-group formLabel">
                    <label htmlFor="password">Confirm Password:</label>
                    <input type="password" name="confirmPassword" className="form-control borderInput"
                        value={fields.confirmPassword} onChange={handleInputChange} id="confirmPassword"
                        placeholder="Enter Password Again" required></input>
                    {errors.confirmPassword &&
                        <div className="text-danger">{errors.confirmPassword}</div>
                    }
                </div>
                <p><span className="pwdRule">Password Rules:</span><br />Must be at least 6 characters long<br />Must contain at least 1 number
                    and 1 special character<br />Must contain at least 1 uppercase and 1 lowercase character</p>
                <button type="submit" className="btn btn-primary btn-lg mb-5">Sign Up</button>
            </form>
        </div>
    );
}
