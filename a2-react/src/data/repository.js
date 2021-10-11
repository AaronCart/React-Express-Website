const USERS_KEY = "users";

function checkUsers() {
    if (localStorage.getItem(USERS_KEY) !== null)
        return;

    const users = [
        {
            name1: "Test Name",
            email: "hello@gmail.com",
            password: "Java123!"
        }
    ];

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
// Simple test function to see if user input is stored in localStorage correctly

function getUsers() {
    checkUsers();
    const data = localStorage.getItem(USERS_KEY);
    return JSON.parse(data);
}
// Access data from local storage

function verifyUser(email, password) {
    const users = getUsers();

    if (email === users.email && password === users.password) {
        return true;
    } else {
        return false;
    }
}

export {
    verifyUser,
    getUsers
}