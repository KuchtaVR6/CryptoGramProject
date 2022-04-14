import React from 'react'

import {Link} from 'react-router-dom'
import Navbar from './Navbar'

const Welcome = () => {
    const navPages = [
        {
            text: 'Login',
            link: '/login'
        },
        {
            text: 'Sign Up',
            link: '/register'
        }
    ]
    return (
        <div className='welcome-main'>
            <Navbar pages={navPages}/>
            <div className='welcome'>
                <div className='row w-100 m-0 p-0 fullpage'>
                    <div className='col-md-6'>
                        <div className="welcome-text">
                            <img id="welcomeLogo" src='logo.png' className='logo'
                                 alt='CryptoGram, Cryptocurrency made simple'></img>
                            <div>
                                <h1>
                                    Discover the future in cryptocurrency transactions.
                                </h1>
                                <h3>
                                    Sign up and get started today!
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className='buttons col-md-6'>
                        <div className="welcome-buttons">
                            <h2>
                                <b>New to our platform?</b> <br/>
                                Click here to register and change the way you spend money forever. <br/><br/>
                                <Link to="/register">Sign Up</Link><br/><br/><br/>

                                <b>Already have an Account?</b> <br/>
                                If you already have an account click here to log in. <br/><br/>
                                <Link to="/login">Sign In</Link>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Welcome
