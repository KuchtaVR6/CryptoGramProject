import React, {useEffect, useRef, useState} from 'react'
import Notification from "./Notification";

const Notifications = ({preferredCurrency, popPrompt, closePrompt}) => {
    const [Response, setResponse] = useState([])
    const [displaySetting, setDisplay] = useState("none")
    const initRenderM = useRef(true)

    useEffect(() => {
        let initFetch = async () => {
            let token = sessionStorage.getItem('token');
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "sessionToken": token
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("/API/fetchNotifications", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if ("error" in result) {
                        if (result.error === "Access Denied") {
                            window.alert("For security reasons, Session expired, please log in again.")
                            window.location = "/login";
                        }
                    } else if ("notifications" in result) {
                        setResponse(result.notifications)
                        setDisplay("inherit")
                    } else if ("No_notifications" in result) {
                        setDisplay("none");
                    } else {
                        window.location = "";
                    }
                })
                .catch(() => window.location = "/error");

        }

        if (initRenderM.current) {
            initFetch().then(() => {
            });
            initRenderM.current = false
        }


    }, []);

    if (initRenderM.current) {
        return (
            <div className='transactionBlock' style={{height: "inherit", width: "inherit"}}>
                <h4 className="headerLeft"
                    style={{display: "flex", alignItems: "center", height: "inherit", width: "inherit"}}>
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
        <div className='tradeHistory' style={{marginTop: "3.5%", display: `${displaySetting}`}}>
            <h3>Notifications</h3>
            <div className='scrollable innerTradeHistory'>
                {Response.map((ch) => {
                    return <Notification key={ch.id} id={ch.id} notification={ch.transaction}
                                         preferredCurrency={preferredCurrency}
                                         popPrompt={popPrompt} closePrompt={closePrompt} type={ch.type}/>;
                })}
            </div>
        </div>
    )
}
export default Notifications