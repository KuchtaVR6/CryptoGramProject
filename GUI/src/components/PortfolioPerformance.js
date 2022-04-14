import React from 'react'
import RadialChart from './RadialChart';


const roundDOWN = (num) => {
    if (isNaN(num))
        return 0.00
    return (Math.floor(num * 100) / 100).toFixed(2)
}

const PortfolioPerformance = ({ cryptoHoldings, preferredCurrency, coins }) => {

    const getPVal = () => {
        let total = 0;
        total = 0;

        cryptoHoldings.forEach((ch) => {
            coins.forEach((coin) => {
                if (coin.ticker === ch.ticker) {
                    total = total + (ch.amount * coin.valueInUSD * preferredCurrency.USD)
                }
            })
        })

        return total


    }
    if (!coins || !preferredCurrency.sign) {
        return (
            <div className='transactionBlock' style={{ height: "inherit", width: "inherit" }}>
                <h4 className="headerLeft"
                    style={{ display: "flex", alignItems: "center", height: "inherit", width: "inherit" }}>
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </h4>
            </div>
        )
    }

    return (
        <div className='portfolioPerformance'>
            <h3>Portfolio</h3>
            <div className='innerHoldings'>

                <div className='innerHoldings2'>
                    <div className=''>
                        Total Crypto Value in {preferredCurrency.ticker}:
                    </div>
                    <div className=''>
                        {preferredCurrency.sign[0] === "!" ? preferredCurrency.sign[1] : ""} {roundDOWN(getPVal())} {preferredCurrency.sign.charAt(0) === "!" ? "" : preferredCurrency.sign}
                    </div>
                </div>

                <div className='innerHoldings2 radialChart'>
                    <div className=''>
                        <RadialChart cryptoHoldings={cryptoHoldings} coins={coins} />
                    </div>
                    <div className='headerRight'>

                    </div>


                </div>
            </div>

        </div>
    )

}

export default PortfolioPerformance