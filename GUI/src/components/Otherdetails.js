import React from 'react'
import ChooseAmount from './ChooseAmount.js'
import ChooseDate from './ChooseDate.js';

const Otherdetails = ({
                          setAmount,
                          sCurrency,
                          preferredCurrency,
                          setDate,
                          setTime,
                          highlight,
                          isNegative,
                          cryptoHoldings
                      }) => {
    return (
        <div className={highlight ? 'SearchBox highlight' : 'SearchBox'}>
            <ChooseAmount
                identifier={"O1"}
                setAmount={setAmount}
                target={sCurrency}
                primary={preferredCurrency}
                isNegative={isNegative}
                cryptoHoldings={cryptoHoldings}
                enforceBoth={true}
            />
            <ChooseDate setDate={setDate} setTime={setTime}/>
        </div>
    )
}

export default Otherdetails
