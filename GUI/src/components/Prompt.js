import React from 'react'

const Prompt = ({show, element}) => {

    return (
        <div className='promptBackground' style={{display: show ? "flex" : "none"}}>
            <div className='promptProper'>
                {element}
            </div>
        </div>
    )
}

export default Prompt
