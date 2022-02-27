import React, { useEffect } from 'react';
import './Login.css'
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithRedirect } from 'firebase/auth'
import { auth, provider, db } from '../firebase'

function Login() {
    let history = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                history('/');
            }
        })
    }, [])

    const login = () => {
        signInWithRedirect(auth, provider)
    }
    return (
        <div className="login">
            <div className="login-form">
                <h1>Login in to continue</h1>
                <button onClick={login}>Continue with Google</button>
            </div>
        </div>
    );
}

export default Login;