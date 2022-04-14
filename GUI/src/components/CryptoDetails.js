import React from 'react'

import ChooseAmount from './ChooseAmount';

const CryptoDetails = ({setAmount, cryptoCurrency, fiatCurrency, cryptoHoldings, fiatHoldings, type, highlight}) => {
    return (
        <div className={highlight ? 'SearchBox highlight' : 'SearchBox'}>
            <ChooseAmount
                identifier={"C1"}
                setAmount={setAmount}
                target={type === "buy" ? fiatCurrency : cryptoCurrency}
                primary={type === "buy" ? cryptoCurrency : fiatCurrency}
                cryptoHoldings={cryptoHoldings}
                fiatHoldings={fiatHoldings}
                isNegative={true}
            />
        </div>
    )
}

export default CryptoDetails
