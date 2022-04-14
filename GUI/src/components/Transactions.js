import React from 'react'

import SearchUser from './SearchUser.js'
import ChooseCurrency from './ChooseCurrency.js'
import Otherdetails from './Otherdetails.js';
import ChooseType from './ChooseType.js';

import {useState, useEffect} from 'react';
import ConfirmTransaction from './ConfirmTransaction.js';

const Transactions = ({preferredCurrency, setPreferred, popPrompt, closePrompt, cryptoHoldings, coins}) => {
    //selected Client
    const [sClient, setClient] = useState({})

    //selected Currency
    const [sCurrency, setCurrency] = useState({})

    //Amount set for this transaction
    const [sAmount, setAmount] = useState({})

    //date of the transaction execution
    const [sDate, setDate] = useState()

    //Time of the transaction execution
    const [sTime, setTime] = useState()

    //type of the transaction
    const [sType, setType] = useState("request")

    //keeps track of whether this operation takes money from users account
    const [isNegative, setIN] = useState(false)

    //boolean keeping track of if all inputs are valid
    const [valid, setValid] = useState(0)

    const submit = () => {
        let data = {};
        data['amount'] = sAmount
        data['currency'] = sCurrency
        data['date'] = sDate
        data['recipient'] = sClient
        data['time'] = sTime
        data['type'] = sType
        popPrompt(<ConfirmTransaction transaction={data} preferredCurrency={preferredCurrency}
                                      closePrompt={closePrompt}/>)
    };

    const validateDateTime = () => {
        if (sDate === undefined || sTime === undefined) {
            return false
        }
        try {
            let now = new Date();
            let requested = Date.parse(sDate + " " + sTime);
            if (sDate === "now")
                return true
            return now < requested;

        } catch {
            return false
        }
    }

    const evaluate = () => {
        if ("id" in sClient) //check inputs
        {
            if ("id" in sCurrency) {
                if (sAmount > 0 && validateDateTime()) //time and date needs to be added here
                {
                    setValid(3)
                } else {
                    setValid(2)
                }
            } else {
                setValid(1)
            }
        } else {
            setValid(0);
        }
        if (sType === "send") {
            setIN(true)
        } else if (sType === "request") {
            setIN(false)
        } else {
            //something went very wrong reload the page
            window.location = "";
        }
    }

    useEffect(() => {
        evaluate();
    }, [sClient, sAmount, sCurrency, sDate, sTime, sType])

    return (
        <div className='fullpage'>
            <div className='row w-100 m-0 p-0'>
                <div className='col-md-6'>
                    <SearchUser identifier={"U1"} setClient={setClient} highlight={valid === 0}/>
                </div>
                <div className='col-md-6'>
                    <ChooseCurrency identifier={"C1"} setCurrency={setCurrency} setPreferred={setPreferred}
                                    highlight={valid === 1} coins={coins}/>
                </div>
            </div>
            <div className='row w-100 m-0 p-0'>
                <div className='col-md-6'>
                    <Otherdetails
                        setAmount={setAmount}
                        sCurrency={sCurrency}
                        preferredCurrency={preferredCurrency}
                        isNegative={isNegative}
                        setDate={setDate}
                        setTime={setTime}
                        cryptoHoldings={cryptoHoldings}
                        highlight={valid === 2}
                    />
                </div>
                <div className='col-md-6'>
                    <ChooseType
                        sType={sType}
                        setType={setType}
                        submit={submit}
                        valid={valid === 3}
                        op1={"send"}
                        op2={"request"}
                    />
                </div>
            </div>
        </div>

    )
}

export default Transactions
