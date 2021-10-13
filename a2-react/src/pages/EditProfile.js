import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { findUser, updateUser, setUser } from "../data/repository";

export default function EditProfile(props) {
    const [profile, setProfile] = useState(null);
    const [fields, setFields] = useState(null);
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { email } = useParams();

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

        // Update user information in navbar and profile page
        props.updateUser(profile);


        // setMessage(<><strong>{profile.fName}</strong> profile has been successfully updated!</>);


        // Navigate back to MyProfile Page
        history.push("/profile");
    };

    const handleValidation = () => {
        const trimmedFields = trimFieldsEmptyToNull();
        const currentErrors = {};

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

            // If value is not null trim the field.
            if (field !== null) {
                field = field.trim();

                // If the trimmed field is empty make it null.
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
            <div className="container pt-4">
                <form onSubmit={handleSubmit} className="mx-5">
                    <h2 className="text-success">Personal Details</h2>
                    <div className="form-group formLabel">
                        <label htmlFor="fName">Name</label>
                        <input name="fName" id="fName" className="form-control borderInput"
                            value={fields.fName} onChange={handleInputChange} placeholder="Enter Name" />
                        {errors.fName && <div className="text-danger">{errors.fName}</div>}
                    </div>
                    <div className="form-group formLabel">
                        <label htmlFor="email">Email <span className="text-danger">(Can Not Be Changed)</span></label>
                        <input name="email" id="email" readOnly className="form-control borderInput"
                            value={fields.email} />
                    </div>
                    <div className="form-group">
                        <Link className="btn btn-danger btn-lg mr-5 mb-5" to="/profile">Cancel</Link>
                        <button type="submit" className="btn btn-primary btn-lg mb-5">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}