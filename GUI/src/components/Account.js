import React from 'react'
import PortfolioPerformance from './PortfolioPerformance'
import Holdings from './Holdings'
import TradeHistory from './TradeHistory'
import Notifications from "./Notifications";

const Account = ({cryptoHoldings, fiatHoldings, preferredCurrency, popPrompt, closePrompt, coins}) => {

    return (
        <div className='row w-100 m-0 p-0 fullpage account'>
            <div className='col-md-5 test'>
                <Holdings cryptoHoldings={cryptoHoldings} fiatHoldings={fiatHoldings}/>
                <TradeHistory/>
            </div>
            <div className='col-md-7 test'>
                <Notifications preferredCurrency={preferredCurrency} popPrompt={popPrompt} closePrompt={closePrompt}/>
                <PortfolioPerformance preferredCurrency={preferredCurrency} cryptoHoldings={cryptoHoldings}
                                      coins={coins.currenciesCrypto}/>
            </div>

        </div>
    )
}

export default Account
