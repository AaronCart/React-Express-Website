import React, { useState } from 'react';
import { getUsers } from "../data/repository";

function Posting(props) {
    const [post, setPost] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState({currentUser: getUsers()});

    const handleInputChange = (e) => {
        setPost(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prevents the page from reloading on submit
        const postTrimmed = post.trim();

        if (postTrimmed === "") {
            setErrorMessage("Your post cannot be empty");
            return;
        }

        // Create Post with user's email
        setPosts([...posts, { email: props.email, text: postTrimmed }]);

        // Resets posts to empty strings
        setPost("");
        setErrorMessage("");
    }

    return (
        <React.Fragment>
            <div className="container text-center verdana mb-3">
                <h1 className="my-3">Posting Page</h1>
                <p className="largePara">Welcome to the Posting Page.<br />Here you can make posts
                    to other students or see what other students have been posting about.</p>
            </div>
            <div className="container mb-5">
                <form className="mx-5 formLabel" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="post">New Post</label>
                        <textarea className="form-control" id="post" name="post" rows="4"
                            placeholder="Share your thoughts..." value={post} onChange={handleInputChange}></textarea>
                    </div>
                    {errorMessage !== null &&
                        <div className="form-group">
                            <span className="text-danger">{errorMessage}</span>
                        </div>
                    }
                    <div className="form-group mb-4">
                        <input type="button" className="btn btn-danger btn-lg mr-4" value="Cancel"
                            onClick={() => { setPost(""); setErrorMessage(null); }} />
                        <input type="submit" className="btn btn-primary btn-lg" value="Post" />
                    </div>
                </form>

                <hr />
                <h3 className="mx-5">Posts</h3>
                <div className="container mb-5">
                    {
                        posts.length === 0 ?
                            <span className="text-muted mx-5">No posts have been submitted yet.</span>
                            :
                            posts.map((p) =>
                            // p is just short for posts
                                <div className="border my-3 p-3 mx-5" style={{ whiteSpace: "pre-wrap" }}>
                                    <h4 className="text-success">{username.currentUser.name1}</h4>
                                    {p.text}
                                </div>
                            )
                    }
                </div>
            </div>
        </React.Fragment>
        // React Fragment used to display Posting Page information as well the actual Post Form
    );
}

export default Posting