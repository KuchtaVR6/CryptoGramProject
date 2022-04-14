import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({pages}) => {
    let i = 0;
    return (
        <nav>
            <div className='hover-underline'>
                <Link to="/">
                    CryptoGram
                </Link>
            </div>
            <div className='nav-row'>
                {pages.map((p) => {
                    i++;
                    return <div key={i} className='hover-underline'>
                        <Link to={p.link}>{p.text}</Link>
                    </div>
                })}

            </div>
        </nav>
    )
}

export default Navbar