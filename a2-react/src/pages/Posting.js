import React, { useState, useEffect } from "react";
import { getPosts, createPost } from "../data/repository";

export default function Posting(props) {
    const [post, setPost] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    // Counter used to display the number of characters in a post
    const [count, setCount] = useState(0);

    // Load posts from database on every render
    useEffect(() => {
        async function loadPosts() {
            const currentPosts = await getPosts();

            setPosts(currentPosts);
            setIsLoading(false);
        }

        loadPosts();
    }, []);

    const handleInputChange = (event) => {
        setPost(event.target.value);

        // Update count state atfer every new character is typed out
        setCount(event.target.value.length)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Trim the post text
        const trimmedPost = post.trim();

        // Return error message if a post is left empty
        if (trimmedPost === "") {
            setErrorMessage("A post cannot be empty.");
            return;
        }

        // Create post with user's email
        const newPost = { text: trimmedPost, email: props.user.email, likes: 0, dislikes: 0 };
        await createPost(newPost);

        // Add post to locally stored posts
        setPosts([...posts, newPost]);

        // Reset post content and counter
        setPost("");
        setErrorMessage("");
        setCount(0);

        // Display alert when post is submitted
        alert("Your Post has been submitted down below");
    };

    return (
        <React.Fragment>
            <div className="container text-center verdana mb-3">
                <h1 className="my-3 text-primary bOutline"><b>Posting Page</b></h1>
                <p className="largePara">Welcome to the Posting Page.<br />Here you can make posts
                    to other students or see what other students have been posting about.</p>
            </div>
            <div className="container mb-5 mt-4">
                <form className="mx-5 formLabel" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="post">New Post (Maximum Length: 600 characters)</label>
                        <textarea className="form-control" id="post" name="post" maxlength="600" rows="4"
                            placeholder="Share your thoughts..." value={post} onChange={handleInputChange}></textarea>
                        <h6 className="mt-2 text-danger">{count}/600</h6>
                    </div>
                    {errorMessage !== null &&
                        <div className="form-group">
                            <span className="text-danger">{errorMessage}</span>
                        </div>
                    }
                    <div className="form-group mb-4">
                        <input type="submit" className="btn btn-primary btn-lg mr-4" value="Post" />
                        <input type="button" className="btn btn-danger btn-lg" value="Cancel"
                            onClick={() => { setPost(""); setErrorMessage(null); setCount(0); }} />
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
                                <div className="border border-info bg-light my-3 p-3 mx-5" style={{ whiteSpace: "pre-wrap" }}>
                                    <h4 className="text-success">{p.email}</h4>
                                    <b>{p.text}</b>
                                    <p className="text-muted right">Date Posted: {p.createdAt}</p>
                                    <p>Likes: {p.likes} | Dislikes: {p.dislikes}</p>
                                    <button className="btn btn-outline-primary mr-2">Like</button>
                                    <button className="btn btn-outline-danger">Dislike</button>
                                </div>
                            )
                    }
                </div>
            </div>
        </React.Fragment>
        // React Fragment used to display Posting Page information as well the actual Post Form
    );
}
