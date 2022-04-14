import React from 'react'
import {useRef, useEffect, useState} from 'react'
import Transaction from './Transaction'

const TradeHistory = () => {
    const [Transactions, setTransactions] = useState([])
    const initRender = useRef(true)

    useEffect(() => {
        let initFetch = async () => {
            // var url = 'mockResponses/fetchTradingHistory.json';
            // var transactions = []
            // const res = fetch(url).then((res) => {
            //     const data = res.json().then((data) => {

            //         setTransactions(data.crypto)
            //     })
            // })
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

            fetch("/API/fetchTradingHistory", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if ("error" in result) {
                        window.alert("For security reasons, Session expired, please log in again.")
                        window.location = '/login'
                    } else {
                        setTransactions(result.crypto)
                    }


                })
                .catch(() => window.location = "/error");

        };
        if (initRender.current) {
            initFetch().then(() => {
            });
            initRender.current = false
        }
    }, []);


    if (initRender.current) {
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

    let i = 0;
    return (

        <div className='tradeHistory'>
            <h3>Trade History</h3>
            <div className='scrollable innerTradeHistory'>
                <div className='headerLeft'>Pair
                    <div className='headerRight'>Type</div>
                </div>
                {
                    Transactions.map((ch) => {
                        i++;
                        return <Transaction key={i} transaction={ch}/>
                    })}
            </div>
        </div>
    )

}

export default TradeHistory