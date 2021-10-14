import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { findUser, updateUser, setUser } from "../data/repository";

// Basic backend code sourced from week 9 tutorial

export default function EditProfile(props) {
    const [profile, setProfile] = useState(null);
    const [fields, setFields] = useState(null);
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { email } = useParams();

    // Loads the profile information of the currently signed in User
    useEffect(() => {
        async function loadProfile() {
            const currentProfile = await findUser(email);

            setProfile(currentProfile);
            setFieldsNullToEmpty(currentProfile);
        }
        loadProfile();
    }, [email]);

    const setFieldsNullToEmpty = (currentFields) => {

        currentFields = { ...currentFields };

        for (const [key, value] of Object.entries(currentFields)) {
            currentFields[key] = value !== null ? value : "";
        }
        setFields(currentFields);
    };

    // Generic change handler
    const handleInputChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form and if invalid do not contact API
        const { trimmedFields, isValid } = handleValidation();
        if (!isValid)
            return;

        const profile = await updateUser(trimmedFields);

        // Update user information in navbar and profile page as well as localstorage
        setUser(profile);
        props.updateUser(profile);

        // Navigate back to My Profile Page upon successful Update
        history.push("/profile");
    };

    const handleValidation = () => {
        const trimmedFields = trimFieldsEmptyToNull();
        const currentErrors = {};

        // Sets error messages if a user does not fill out the Name field
        let key = "fName";
        let field = trimmedFields[key];
        if (field === null)
            currentErrors[key] = "Name is required.";
        else if (field.length > 40)
            currentErrors[key] = "Name length cannot be greater than 40 characters";

        setErrors(currentErrors);
        return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
    };

    const trimFieldsEmptyToNull = () => {
        const trimmedFields = {};

        for (const [key, value] of Object.entries(fields)) {
            let field = value;

            // If value is not null trim the field
            if (field !== null) {
                field = field.trim();

                // If the trimmed field is empty make it null
                if (field.length === 0)
                    field = null;
            }
            trimmedFields[key] = field;
        }
        setFieldsNullToEmpty(trimmedFields);
        return trimmedFields;
    };

    if (profile === null || fields === null) {
        return null;
    };

    return (
        <div className="container-fluid">
            <div className="container mt-1 pt-4 border">
                <form onSubmit={handleSubmit} className="mx-5">
                    <h1 className="text-primary text-center mb-3"><b>Edit Profile</b></h1>
                    <div className="form-group formLabel">
                        <label htmlFor="fName">Name</label>
                        <input name="fName" id="fName" className="form-control borderInput" maxlength="40"
                            value={fields.fName} onChange={handleInputChange} placeholder="Enter Name" />
                        {errors.fName && <div className="text-danger">{errors.fName}</div>}
                    </div>
                    <div className="form-group formLabel">
                        <label htmlFor="email">Email <span className="text-danger">(Can Not Be Changed)</span></label>
                        <input name="email" id="email" readOnly className="form-control borderInput"
                            value={fields.email} />
                    </div>
                    <div className="form-group verdana">
                        {/* Navigate back to profile page on Cancel */}
                        <Link className="btn btn-danger btn-lg mr-5 mb-3" to="/profile">Cancel</Link>
                        <button type="submit" className="btn btn-success btn-lg mb-3">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}