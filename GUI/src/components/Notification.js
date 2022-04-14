import React, { useState } from "react"
import ConfirmTransaction from "./ConfirmTransaction";

const Notification = ({ id, notification, preferredCurrency, popPrompt, closePrompt, type }) => {

    const [disable, setDisable] = useState(false);

    const roundUP = (num) => {
        if (isNaN(num))
            return 0.00
        return (Math.ceil(num * 100) / 100).toFixed(2)
    }

    const submit = () => {
        let transaction = { ...notification };
        transaction.date = "now"
        transaction.time = "now"
        popPrompt(<ConfirmTransaction transaction={transaction} preferredCurrency={preferredCurrency}
            closePrompt={closePrompt} additional={close} />)
    };

    const close = () => {
        setDisable(true);
        let myHeaders = new Headers();
        let token = sessionStorage.getItem('token');
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "sessionToken": token,
            "id": id
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/API/dismissNotification", requestOptions)
            .then(response => response.text())
            .then(() => {
                setDisable(true)
            })
            .catch(() => window.location = "/error");
    }

    if (preferredCurrency.USD) {
        if (type === "send") {
            return (
                <div key={id.toString()} className='transactionBlock' style={{ display: disable ? "none" : "inherit" }}>
                    <h4 className="headerRight">
                        <button onClick={close}>Dismiss</button>
                    </h4>
                    <h4 className="headerLeft" style={{ fontWeight: "normal" }}>
                        <b>{notification.recipient.name} <i>({notification.recipient.username})</i></b> has
                        transferred <br />
                        <b>{notification.amount} {notification.currency.ticker}</b> worth <b>{roundUP(preferredCurrency.USD * notification.currency.valueInUSD * notification.amount)} {preferredCurrency.ticker}</b> to
                        you
                    </h4>
                    <p className="time">
                        Sent at {notification.time + " on " + notification.date}
                    </p>
                </div>
            )
        } else {
            return (
                <div key={id.toString()} className='transactionBlock' style={{ display: disable ? "none" : "inherit" }}>
                    <h4 className="headerRight">
                        <button onClick={submit}>Accept</button>
                        <br />
                        <button onClick={close}>Decline</button>
                    </h4>
                    <h4 className="headerLeft" style={{ fontWeight: "normal" }}>
                        <b>{notification.recipient.name} <i>({notification.recipient.username})</i></b> has
                        requested <br />
                        <b>{notification.amount} {notification.currency.ticker}</b> worth <b>{roundUP(preferredCurrency.USD * notification.currency.valueInUSD * notification.amount)} {preferredCurrency.ticker}</b>
                    </h4>
                    <p className="time">
                        Requested at {notification.time + " on " + notification.date}
                    </p>
                </div>
            )
        }
    } else {
        return (
            <div key={"Loading"} className='transactionBlock'>
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

}

export default Notification