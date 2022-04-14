import React from 'react'
import {HiOutlineLogout} from 'react-icons/hi'

const Menu = () => {
    function logout() {
        sessionStorage.clear()
        window.location = '/'
    }

    return (
        <div className='menu'>
            <img src='logo.png' className='menuLogo' alt="CryptoGram logo"/>
            <button onClick={logout}><span>Logout</span><HiOutlineLogout id='hide' size={50}/></button>
        </div>
    )
}

export default Menu
