// import axios from "axios";
// import router from "@/router";

export function setUserSessionData(userData) {
    userData = JSON.stringify(userData);
    localStorage.setItem("userSession", userData);
}

export function getUserSessionData() {
    return JSON.parse(localStorage.getItem("userSession"));
}

export function removeUserSessionData() {
    return localStorage.removeItem("userSession");
}

export function setNewAccessToken(access) {
    let userSession = JSON.parse(localStorage.getItem("userSession"));
    if (userSession) {
        userSession.access = access;
        setUserSessionData(userSession);
    }
    // else
        // router.push("/sign-up")
}

export function refreshAccessToken() {
    // axios.post(${process.env.VUE_APP_API_URL}/auth/token/refresh/, {
    //     refresh: getUserSessionData().refresh,
    // })
    //     .then(response => {
    //         if (response.status === 200) {
    //             setNewAccessToken(response.data.access);
    //         }
    //     })
    //     .catch(error => {
    //         if (error.response.data.code === "token_not_valid"){
    //             removeUserSessionData();
    //             router.push("/home");
    //         }
    //     })

    // axios.post(${process.env.VUE_APP_API_URL}/auth/token/refresh/, {
    //     refresh: getUserSessionData().refresh,
    // })
    //     .then(response => {
    //         if (response.status === 200) {
    //             setNewAccessToken(response.data.access);
    //         }
    //     })
    //     .catch(error => {
    //         if (error.response.data.code === "token_not_valid"){
    //             removeUserSessionData();
    //             router.push("/home");
    //         }
    //     })
}

export function checkIsAccessTokenExpired(response) {
    if (response.status === 401 && response.data.detail === "Given token not valid for any token type" &&
        response.data.messages[0].tokentype === "access"){
        refreshAccessToken();
    }
}

export function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(Buffer.from(base64, "base64").toString("ascii").split("").map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}