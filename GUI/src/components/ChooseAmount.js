import React, {useEffect, useRef} from 'react'

import {useState} from 'react';

const ChooseAmount = ({
                          identifier,
                          setAmount,
                          target,
                          primary,
                          isNegative,
                          enforceBoth,
                          cryptoHoldings,
                          fiatHoldings
                      }) => {

    const [balance, setBalance] = useState(0);
    const [currentRate, setCR] = useState();

    if (target === undefined || primary === undefined) {
        return (
            <>
            </>
        )
    }

    const [selection, setSelection] = useState(false);

    const [warning, setWarning] = useState("Approximation");

    const initRender = useRef(true);

    const roundUP = (num) => {
        if (isNaN(num))
            return 0.00
        return (Math.ceil(num * 100) / 100).toFixed(2)
    }

    const roundDOWN = (num) => {
        if (isNaN(num))
            return 0.00
        return (Math.floor(num * 100) / 100).toFixed(2)
    }

    const checkDoublePrecision = (num) => {
        if ((num > 9999999999999999999) || num<0)
        {
            return false;
        }
        if ((num * 100) % 1 === 0) {   //fast but unreliable due to how num works
            return true
        }
        let precision = num.toString().split(".")
        return precision[1].length < 3
    }

    const invalidate = (element, clear = true) => {
        element.className = 'amountInput invalid'
        if (clear)
            document.getElementById(identifier + 'worth').value = ""
        setAmount(0)
    }

    const revalidate = (element) => {
        element.className = 'amountInput'
    }

    const changeAmount = (event) => {
        let newAmount = event.target.value;
        let element = event.target;
        if (newAmount <= 0) {
            invalidate(element)
            setWarning("Below the minimum of 0.01")
        }
        if (newAmount > balance && isNegative) {
            invalidate(element)
            setWarning("Insufficient Funds")
        } else if (!checkDoublePrecision(newAmount)) {
            invalidate(element)
            setWarning("Invalid Input")
        } else {
            revalidate(element)
            setAmount(newAmount);
            setWarning("Approximation")
            let worth = roundDOWN(newAmount * currentRate);
            if (worth <= 0.009) {
                document.getElementById(identifier + 'worth').value = ""
            } else {
                document.getElementById(identifier + 'worth').value = worth
            }

        }
    }

    const pushAmount = (calcAmount) => {
        let amountElem = document.getElementById(identifier + "amount");
        if (calcAmount <= 0) {
            invalidate(amountElem, false)
            setWarning("Below the minimum of 0.01")
            amountElem.value = ""
            return false
        }
        if (calcAmount > balance && isNegative) {
            invalidate(amountElem, false)
            setWarning("Insufficient Funds")
            amountElem.value = ""
            return false
        } else {
            revalidate(amountElem)
            setAmount(calcAmount)
            setWarning("Approximation")
            amountElem.value = calcAmount
            return true
        }
    }

    const changeWorth = (event) => {
        if (enforceBoth && !checkDoublePrecision(event.target.value)) {
            invalidate(event.target, false)
        } else {
            pushAmount(roundUP(event.target.value / currentRate))
            if (enforceBoth) {
                revalidate(event.target)
            }
        }
    }

    const numberInputOnWheelPreventChange = (e) => {
        // deselect the target before change can happen
        e.target.blur()
    }

    const checkAmount = (newBalance = null) => {
        if (newBalance === null) {
            newBalance = balance
        }
        let input = document.getElementById(identifier + "amount");

        if (input.value > newBalance && isNegative) {
            setWarning("Insufficient Funds")
            invalidate(input)
        } else if ((input.value * 100) % 1 !== 0) {
            invalidate(input)
            setWarning("Invalid Input")
        } else {
            revalidate(input)
            setAmount(input.value)
            setWarning("Approximation")
            let worth = roundDOWN(input.value * currentRate);
            if (worth <= 0.009) {
                document.getElementById(identifier + 'worth').value = ""
            } else {
                document.getElementById(identifier + 'worth').value = worth
            }
        }
    }

    useEffect(() => {
        if (initRender.current) {
            initRender.current = false
        } else {
            checkAmount();
        }
    }, [isNegative]);

    useEffect(() => {
        let curr;
        if ("ticker" in target && "ticker" in primary) {
            setSelection(true)
            //this will be adapted to work with the Holdings
            let ratio;
            if ("USD" in primary) {
                ratio = target["valueInUSD"] * primary["USD"];
            } else {
                ratio = 1 / (target["USD"] * primary["valueInUSD"]);
            }
            setCR(ratio)
            if (document.getElementById(identifier + 'amount').value >= 0.01) {
                document.getElementById(identifier + 'worth').value = roundDOWN(document.getElementById(identifier + 'amount').value * ratio)
            }

            if ("valueInUSD" in target) {
                for (curr in cryptoHoldings) {
                    if (cryptoHoldings[curr].ticker === target.ticker) {
                        setBalance(cryptoHoldings[curr].amount)
                        checkAmount(cryptoHoldings[curr].amount);
                        return;
                    }
                }
                setBalance(0)
            } else {
                for (curr in fiatHoldings) {
                    if (fiatHoldings[curr].ticker === target.ticker) {
                        setBalance(fiatHoldings[curr].amount)
                        checkAmount(fiatHoldings[curr].amount);
                        return;
                    }
                }
                setBalance(0)
            }
            //once new balance is fetch do the check again

        }
    }, [target, primary])

    return (
        <div className='amount'>

            <form style={{display: selection ? "inline" : "none"}}>
                <div style={{display: isNegative ? "inline" : "none"}}>
                    <div>
                        <h4>Currently you hold: {balance} {target["ticker"]}</h4>

                        <h4>Worth: &nbsp; &nbsp; {roundDOWN(balance * currentRate)} {primary["ticker"]}</h4>
                    </div>
                </div>
                <table>
                    <tbody>
                    <tr>
                        <th>
                            <label htmlFor="amount">Amount:</label>
                        </th>
                        <th>
                            <input
                                id={identifier + "amount"}
                                type="number"
                                onChange={changeAmount}
                                placeholder='0.00'
                                onWheel={numberInputOnWheelPreventChange}
                            >
                            </input>
                        </th>
                        <th id="currencyShort">
                            {target["ticker"]}
                        </th>
                    </tr>
                    <tr>
                        <th>

                        </th>
                        <th>
                            {warning}
                        </th>
                        <th>

                        </th>
                    </tr>
                    <tr>
                        <th>
                            <label htmlFor="worth">Worth:</label>
                        </th>
                        <th>
                            <input
                                id={identifier + "worth"}
                                type="number"
                                onChange={changeWorth}
                                placeholder='0.00'
                                onWheel={numberInputOnWheelPreventChange}
                            >
                            </input>
                        </th>
                        <th id="currencyShort">
                            {primary["ticker"]}
                        </th>
                    </tr>
                    </tbody>
                </table>


                <br/>

                <br/>


            </form>

            <h4 style={{display: selection ? "none" : "inline"}}>
                Please choose the currency first
                <br/>
                <br/>
            </h4>

        </div>
    )
}

export default ChooseAmount