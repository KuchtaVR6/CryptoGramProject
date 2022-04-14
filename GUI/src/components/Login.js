import React, {useState} from 'react'
import Navbar from './Navbar'

const Login = () => {

    const [warning, setWarning] = useState("");

    const login = (event) => {

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password && email.includes("@")) {
            event.preventDefault();
        } else {
            return;
        }

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "email": email,
            "password": password
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/API/login", requestOptions)
            .then(response => response.json())
            .then(async result => {
                if ("response" in result) {
                    if (result.response) {
                        await sessionStorage.setItem('token', result.token);
                        window.location = "/dashboard";
                    } else {
                        setWarning("Incorrect Email or Password")
                    }
                } else {
                    window.location = "";
                }
            })
            .catch(() => window.location = "/error");
    }

    const navPages = [{
        text: 'Sign Up',
        link: '/register'
    }]
    return (
        <div className='login-main'>
            <Navbar pages={navPages}/>
            <div className='login'>

                <div className="login-fullpage d-flex justify-content-center">

                    <div className="col-md-4">
                        <div className="login-page">
                            <form className='login-form'>
                                <div className="login-form-title">
                                    Login
                                </div>
                                <div className="login-form-img">
                                    <img src='logo.png' className='logo' alt='CryptoGram, Cryptocurrency made simple'
                                         width={300}></img>
                                </div>
                                <div className="login-form-input">
                                    <input type="email" id="email" name="email" placeholder="Email" required/><br/>
                                    <input type="password" id="password" name="password" placeholder="Password"
                                           required/><br/>
                                    <p>{warning}</p>
                                    <input type="submit" id="submit" onClick={login} className='button' value="Log in"/>
                                </div>
                                <div className="login-form-signup text-center">
                                    Don't have an account? &nbsp;
                                    <a className="signup" href="/register">
                                        Sign Up
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
