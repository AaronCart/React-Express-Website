import { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { findUser, updateUser } from "../data/repository";
import profilePic from "./profile.png";
// Image Source: https://www.pngitem.com/middle/iTxxxxm_blank-profile-picture-circle-hd-png-download/

export default function EditProfile() {
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

        // Validate form and if invalid do not contact API.
        const { trimmedFields, isValid } = handleValidation();
        if (!isValid)
            return;

        const profile = await updateUser(trimmedFields);

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
        <div>
            <div className="row">
                <div className="col-12 col-md-3 bg-secondary">
                    <div className="text-center mt-2">
                        <img src={profilePic} alt="Blank Profile Pic.png" width="5%" height="auto" />
                    </div>
                    <h5>{profile.fName}</h5>
                    <h6 className="text-muted">{profile.email}</h6>
                </div>
            </div>
        </div>
    );



}