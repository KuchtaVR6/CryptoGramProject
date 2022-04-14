import React from 'react'
import Asset from './Asset'

const Holdings = ({cryptoHoldings, fiatHoldings}) => {
    let i = 0;
    return (
        <div className='holdings'>
            <h3>Holdings</h3>
            <div className='innerHoldings'>
                <div className='headerLeft'>Currency
                    <div className='headerRight'>Amount</div>
                </div>
                {cryptoHoldings.map((ch) => {
                    i++;
                    return <Asset key={i} asset={ch}/>
                })}

                <div className='headerLeft'>Currency
                    <div className='headerRight'>Amount</div>
                </div>
                {fiatHoldings.map((ch) => {
                    i++;
                    return <Asset key={i} asset={ch}/>
                })}
            </div>
        </div>
    )

}

export default Holdings