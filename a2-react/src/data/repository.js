import axios from "axios";

// Constants
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

async function verifyUser(email, password) {
    const response = await axios.get(API_HOST + "/api/users/login", { params: { email, password } });
    const user = response.data;

    if (user !== null)
        setUser(user);

    return user;
}

// User Requests
async function findUser(id) {
    const response = await axios.get(API_HOST + `/api/users/select/${id}`);

    return response.data;
}

async function createUser(user) {
    const response = await axios.post(API_HOST + "/api/users", user);

    return response.data;
}

// Posts Requests
async function getPosts() {
    const response = await axios.get(API_HOST + "/api/posts");

    return response.data;
}

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

function removeUser() {
    localStorage.removeItem(USER_KEY);
}

export {
    verifyUser, findUser, createUser,
    getPosts, createPost,
    getUser, removeUser
}