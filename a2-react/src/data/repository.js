import axios from "axios";

// Constants
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

async function verifyUser(email, password) {
    const response = await axios.get(API_HOST + "/api/users/signin", { params: { email, password } });
    const user = response.data;

    if (user !== null)
        setUser(user);

    return user;
}

// Find the specific user for sign up and editing
async function findUser(email) {
    const response = await axios.get(API_HOST + `/api/users/select/${email}`);

    return response.data;
}

async function findUsers() {
    const response = await axios.get(API_HOST + "/api/users");

    return response.data;
}

// Create user when sign up is successful
async function createUser(user) {
    const response = await axios.post(API_HOST + "/api/users", user);

    return response.data;
}

// Edit User information
async function updateUser(user) {
    const response = await axios.put(API_HOST + "/api/users", user);

    return response.data;
}

// Load posts from database when on Posts Page
async function getPosts() {
    const response = await axios.get(API_HOST + "/api/posts");

    return response.data;
}

// Add new posts to database
async function createPost(post) {
    const response = await axios.post(API_HOST + "/api/posts", post);

    return response.data;
}

// Used to remember if user is logged in
function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
}

// Used when signing out
function removeUser() {
    localStorage.removeItem(USER_KEY);
}

export {
    verifyUser, findUser, createUser,
    updateUser, getPosts, createPost,
    getUser, removeUser, findUsers, setUser
}

// Code sourced from week 8 and 9 tutorial