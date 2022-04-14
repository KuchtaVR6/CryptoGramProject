import React from 'react'
import ChooseCurrency from './ChooseCurrency'

import {useState, useEffect} from 'react';
import ChooseType from './ChooseType';
import CryptoDetails from './CryptoDetails';

import ConfirmTransaction from './ConfirmTransaction';

const Crypto = ({preferredCurrency, setPreferred, cryptoHoldings, fiatHoldings, popPrompt, closePrompt, coins}) => {
    const [sAmount, setAmount] = useState({})
    const [sType, setType] = useState("buy")
    const [cryptoCurrency, setCCurrency] = useState({})
    const [fiatCurrency, setFCurrency] = useState({})
    const [valid, setValid] = useState(0)

    useEffect(() => {
        if ("ticker" in cryptoCurrency) {
            if ("ticker" in fiatCurrency) {
                if (sAmount > 0) {
                    setValid(3)
                } else {
                    setValid(2)
                }
            } else {
                setValid(1)
            }
        } else {
            setValid(0)
        }
    }, [sAmount, cryptoCurrency, fiatCurrency, sType]);

    const submit = () => {
        let data = {};
        data['amount'] = sAmount
        data['type'] = sType
        if (sType === "buy") {
            data['payCurrency'] = fiatCurrency
            data['getCurrency'] = cryptoCurrency
        } else {
            data['payCurrency'] = cryptoCurrency
            data['getCurrency'] = fiatCurrency
        }
        popPrompt(<ConfirmTransaction transaction={data} preferredCurrency={preferredCurrency}
                                      closePrompt={closePrompt}/>)
    };

    return (
        <>
            <div className='row w-100 m-0 p-0 fullpage'>
                <div className='col-md-6'>
                    <ChooseCurrency identifier={"C0"} setCurrency={setCCurrency} setPreferred={setPreferred}
                                    highlight={valid === 0} coins={coins}/>
                </div>
                <div className='col-md-6'>
                    <ChooseCurrency identifier={"C1"} setCurrency={setFCurrency} setPreferred={setPreferred}
                                    isFiat={true} highlight={valid === 1} coins={coins}/>
                </div>
            </div>
            <div className='row w-100 m-0 p-0 fullpage'>
                <div className='col-md-6'>
                    <CryptoDetails
                        setAmount={setAmount}
                        amount={sAmount}
                        cryptoCurrency={cryptoCurrency}
                        fiatCurrency={fiatCurrency}
                        cryptoHoldings={cryptoHoldings}
                        fiatHoldings={fiatHoldings}
                        type={sType}
                        highlight={valid === 2}
                    />
                </div>
                <div className='col-md-6'>
                    <ChooseType
                        sType={sType}
                        setType={setType}
                        submit={submit}
                        valid={valid === 3}
                        op1={"buy"}
                        op2={"sell"}
                    />
                </div>
            </div>
        </>
    )
}

export default Crypto
