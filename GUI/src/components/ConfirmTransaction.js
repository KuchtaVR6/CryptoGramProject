import React, {useEffect, useState} from 'react'

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const ConfirmTransaction = ({transaction, preferredCurrency, closePrompt, additional}) => {

    const confirmPayment = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('transaction', transaction);

        setBottom([<h4>Processing, please wait</h4>, <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>])
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "sessionToken": sessionStorage.getItem('token'),
            "amount": transaction.amount,
            "currency": transaction.currency,
            "date": transaction.date,
            "recipient": transaction.recipient,
            "time": transaction.time,
            "type": transaction.type,
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/API/requestSend", requestOptions)
            .then(response => response.json())
            .then(result => {
                if ("response" in result) {
                    if (additional) {
                        additional();
                    }
                    setBottom([<button onClick={() => {
                        window.location.reload();
                    }}>Back to the Dashboard</button>, <h4>Transaction has been processed successfully</h4>])
                } else if ("error" in result) {
                    if (result.error === "Access Denied") {
                        window.alert("For security reasons, Session expired, please log in again.")
                        window.location = "/login";
                    } else if (result.error === "Insufficient funds") {
                        setBottom([<button onClick={() => {
                            closePrompt();
                        }}>Go Back</button>, <h4>You don't have sufficient funds for this transaction.</h4>,])
                    } else {
                        setBottom([<h4>An unexpected error has occurred. The transaction was cancelled.</h4>,
                            <button onClick={() => {
                                window.location.reload();
                            }}>Reload the page</button>])
                    }
                } else {
                    setBottom([<h4>An unexpected error has occurred. The transaction was cancelled.</h4>,
                        <button onClick={() => {
                            window.location.reload();
                        }}>Reload the page</button>])
                }
            })
            .catch(() => {
                setBottom([<h4>An unexpected error has occurred. The transaction was cancelled.</h4>,
                    <button onClick={() => {
                        window.location.reload();
                    }}>Reload the page</button>])
            });
    }

    const closePromptCancel = () => {
        setBottom([<h4>Cancelling, please wait</h4>, <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>])
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "sessionToken": sessionStorage.getItem('token'),
            "confirm": false
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("/API/confirmTransaction", requestOptions)
            .then(response => response.json())
            .then(result => {
                if ("response" in result) {
                    setBottom([<button onClick={() => {
                        window.location.reload();
                    }}>Back to the Dashboard</button>, <h4>Transaction has been cancelled successfully</h4>])
                } else if ("error" in result) {
                    if (result.error === "Access Denied") {
                        window.alert("For security reasons, Session expired, please log in again.")
                        window.location = "/login";
                    } else {
                        setBottom([<h4>An unexpected error has occurred, but the transaction was cancelled.</h4>,
                            <button onClick={() => {
                                window.location.reload();
                            }}>Reload the page</button>])
                    }
                } else {
                    setBottom([<h4>An unexpected error has occurred, but the transaction was cancelled.</h4>,
                        <button onClick={() => {
                            window.location.reload();
                        }}>Reload the page</button>])
                }
            })
            .catch(() => {
                setBottom([<h4>An unexpected error has occurred, but transaction was cancelled.</h4>,
                    <button onClick={() => {
                        window.location.reload();
                    }}>Reload the page</button>])
            });
    }

    const confirmOrder = (event) => {
        event.preventDefault();

        setBottom([<h4>Processing, please wait</h4>, <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>])
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "sessionToken": sessionStorage.getItem('token'),
            "confirm": true
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/API/confirmTransaction", requestOptions)
            .then(response => response.json())
            .then(result => {
                if ("response" in result) {
                    setBottom([<button onClick={() => {
                        window.location.reload();
                    }}>Back to the Dashboard</button>, <h4>Transaction has been processed successfully</h4>])
                } else if ("error" in result) {
                    if (result.error === "Access Denied") {
                        window.alert("For security reasons, Session expired, please log in again.")
                        window.location = "/login";
                    } else if (result.error === "Insufficient funds") {
                        setBottom([<button onClick={() => {
                            closePrompt();
                        }}>Go Back</button>, <h4>You don't have sufficient funds for this transaction.</h4>,])
                    } else {
                        setBottom([<h4>An unexpected error has occurred. The transaction was cancelled.</h4>,
                            <button onClick={() => {
                                window.location.reload();
                            }}>Reload the page</button>])
                    }
                } else {
                    setBottom([<h4>An unexpected error has occurred. The transaction was cancelled.</h4>,
                        <button onClick={() => {
                            window.location.reload();
                        }}>Reload the page</button>])
                }
            })
            .catch(() => setBottom([<h4>An unexpected error has occurred. The transaction was cancelled.</h4>,
                <button onClick={() => {
                    window.location.reload();
                }}>Reload the page</button>]));
    }

    const [bottom, setBottom] = useState(([<button onClick={closePrompt}>Go Back</button>,
        <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>]))

    const [total, setTotal] = useState(0);

    const round = (num) => {
        if (isNaN(num))
            return 0.00
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    useEffect(() => {
        if ("payCurrency" in transaction) {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "sessionToken": sessionStorage.getItem('token'),
                "amount": transaction['amount'],
                "type": transaction['type'],
                "payCurrency": transaction['payCurrency'],
                "getCurrency": transaction['getCurrency']
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("/API/order", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if ("total" in result) {
                        setTotal(Number(result.total));
                        setBottom([<button onClick={closePromptCancel}>Go Back</button>,
                            <button onClick={confirmOrder}>Confirm {capitalize(transaction['type'])}</button>]);
                    } else if ("error" in result) {
                        if (result.error === "Access Denied") {
                            window.alert("For security response, Session expired, please log in again.")
                            window.location = "/login";
                        } else if (result.error === "Insufficient to buy 0.01") {
                            setBottom([<button onClick={closePrompt}>Go Back</button>,
                                <h4>Insufficient to buy at least 0.01, please change the amount</h4>]);
                        } else if (result.error === "CurrencyNotFoundError") {
                            setBottom([<button onClick={closePrompt}>Go Back</button>,
                                <h4>Currency not found, please choose the currency again</h4>]);
                        } else {
                            window.alert("Unexpected error occurred, the page will be reloaded, transaction has been cancelled")
                            window.location = "";
                        }
                    } else {
                        window.alert("Unexpected error occurred, the page will be reloaded, transaction has been cancelled")
                        window.location = "";
                    }
                })
                .catch(() => window.location = "/error");

        } else {
            setBottom([<button onClick={closePrompt}>Go Back</button>,
                <button onClick={confirmPayment}>Confirm {capitalize(transaction['type'])}</button>]);
        }
    }, [transaction]);

    if ('recipient' in transaction) {
        return (
            <div className='confirmPayment'>
                {bottom[0]}
                <div className='details'>
                    Transaction type: <br/><b>{transaction['type'].toUpperCase()}</b> <br/>
                    <hr/>
                    Recipient: <br/><b>{transaction['recipient']['name']} <i>{transaction['recipient']['username']}</i></b>
                    <br/>
                    <hr/>
                    Amount: <br/><b>{round(transaction['amount'])} {transaction['currency']['ticker']}</b> <br/>
                    <hr/>
                    Worth: <br/><b>{round(transaction['amount'] * transaction['currency']['valueInUSD'] * preferredCurrency['USD'])} {preferredCurrency['ticker']}</b>
                    <br/>
                    <hr/>
                    Realization: <br/><b>{transaction['date'] === "now" ? "Instantly" : transaction['date'] + " " + transaction['time']}</b>
                    <br/>
                </div>
                {bottom[1]}
            </div>
        )
    } else {
        return (
            <div className='confirmPayment'>
                {bottom[0]}
                <div className='details'>
                    Transaction type: <br/><b>{transaction['type'].toUpperCase()}</b> <br/>
                    <hr/>
                    You pay: <br/><b>{round(transaction['amount'])} {transaction['payCurrency']['ticker']}</b> <br/>
                    <hr/>
                    You receive: <br/><b>{total} {transaction['getCurrency']['ticker']}</b> <br/>
                </div>
                {bottom[1]}
            </div>
        )
    }
}

export default ConfirmTransaction
