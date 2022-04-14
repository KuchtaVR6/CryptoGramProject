import React from 'react'

import Navbar from './Navbar'

const NotFound = () => {
    function home() {
        window.location.href = '/';
    }

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
        <div className='error404'>
            <Navbar pages={navPages}/>
            <h1> Oops... </h1>
            <p>
                Sorry, we can't find the page you were looking for...<br></br>
            </p>
            <button onClick={home}>Return to Home</button>
        </div>
    )
}

export default NotFound
