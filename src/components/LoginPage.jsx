// LoginPage.jsx

import React, { useContext } from 'react';
import { mainContext, GlobalContextProvider } from '../context/GlobalContext';

export default function LoginPage() {
    return (
        <GlobalContextProvider>
            <LoginPageContent />
        </GlobalContextProvider>
    );
}

function LoginPageContent({setLogged}) {
    const context = useContext(mainContext);
    const { API_URL, newProp } = context;

    async function Login(event) {
        event.preventDefault();
        const username = event.target.username.value
        const password = event.target.password.value
        const response = await fetch(`${API_URL}/login`, {body: JSON.stringify({username, password})})
        const json = response.json()
        let token = json["authtoken"] || json["auth-token"]
        console.log(json)
        console.log(token)
        sessionStorage.setItem("loginStatus", "Logged")
    }

    console.log("This is login");

    return (
        <div className="container">
            <form onSubmit={Login}> 
                <input type="text" name="username" />
                <input type="password" name="password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
