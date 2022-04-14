import React from 'react'

const ChooseType = ({sType, setType, submit, valid, highlight, op1, op2}) => {
    return (
        <div className={highlight ? 'SearchBox highlight' : 'SearchBox'}>
            <h4> Select the transaction type </h4>
            <div className='buySellButtons'>
                <button onClick={() => {
                    setType(op1)
                }} className={sType === op1 ? "type selected" : "type"}>{op1.toUpperCase()}</button>
                <span className='increaseSize'>or</span>
                <button onClick={() => {
                    setType(op2)
                }} className={sType === op2 ? "type selected" : "type"}>{op2.toUpperCase()}</button>
            </div>
            <br/>
            <div className='confirmationButton'>
                <button className='submit' onClick={submit} style={{display: valid ? "inline" : "none"}}>Go
                    to {sType.toUpperCase()} confirmation screen
                </button>
                <button className='submit disabled' onClick={submit} style={{display: valid ? "none" : "inline"}}
                        disabled>Go to {sType.toUpperCase()} confirmation screen
                </button>
            </div>
        </div>
    )
}

export default ChooseType
