import React from 'react'

const Asset = ({asset}) => {
    if(asset.sign[0] !== "!") {
        return (
            <div className='assetInfo'>
                <h4>
                    {asset.ticker}
                </h4>
                <p>
                    {asset.amount} {asset.sign}
                </p>
            </div>
        )
    }
    else{
        return (
            <div className='assetInfo'>
                <h4>
                    {asset.ticker}
                </h4>
                <p>
                    {asset.sign[1]} {asset.amount}
                </p>
            </div>
        )
    }
}

export default Asset