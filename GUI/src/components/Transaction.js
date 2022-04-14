import React from "react"

const Transaction = ({transaction}) => {
    if (transaction.addiType === "price") {
        return (
            <div className='transactionBlock'>
                <h4 className="headerLeft">
                    <div className="pair">
                        {transaction.pair}
                    </div>
                </h4>
                <h4 className="headerRight">
                    {transaction.type}
                </h4>
                <h3>{transaction.from_amount} --{">"} {transaction.to_amount}</h3>
                <p>
                    Price: {transaction.additional}
                </p>
                <p className="time">
                    {transaction.time}
                </p>
            </div>
        )
    } else {
        return (
            <div className='transactionBlock'>
                <h4 className="headerLeft">
                    <div className="pair">
                        {transaction.pair}
                    </div>
                </h4>
                <h4 className="headerRight">
                    {transaction.type}
                </h4>
                <h3>{transaction.from_amount ? transaction.from_amount : ""} --{">"} {transaction.to_amount ? transaction.to_amount : ""}</h3>
                <p>
                    Account: <br/>{transaction.additional}
                </p>
                <p className="time">
                    {transaction.time}
                </p>
            </div>
        )
    }
}

export default Transaction