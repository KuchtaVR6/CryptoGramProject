import React, { useEffect } from 'react'

import { useState} from 'react';

const ChooseCurrency = ({ identifier, setCurrency, highlight, isFiat, coins}) => {
  const [response, setResponse] = useState([]);

  const round = (num) => {
    if (isNaN(num))
      return 0.00
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const returnCurrency = (event) => {
    let elem = event['target'];
    while (elem.tagName !== "BUTTON") {
      elem = elem.parentElement
    }
    setCurrency(coins[isFiat ? "currenciesFiat" : "currenciesCrypto"][elem.id]);
    let x = document.getElementsByClassName(identifier + ' searchResult selected');
    for (let i = 0; i < x.length; i++) {
      x[i].className = 'searchResult';
    }
    elem.className = identifier + ' searchResult selected';
  }

  useEffect(() => {
    let spans = [];
    if ("preferredCurrency" in coins) {
      spans.push(<div key={9999} className='searchHeader'><p>Currency<i>Price in {coins["preferredCurrency"]['ticker']}</i></p></div>)
      for (let i = 0; i < coins[isFiat ? "currenciesFiat" : "currenciesCrypto"].length; i++) {
        if(coins.preferredCurrency.sign[0] === "!") {
          spans.push(
              <button className='searchResult' key={i + 2000} id={i.toString()} onClick={returnCurrency}>
                <div key={i + 3000}>
                  {coins[isFiat ? "currenciesFiat" : "currenciesCrypto"][i]['name']}
                  <i key={i + 4000}>
                    {isFiat ?
                        coins["preferredCurrency"]["sign"][1] + round(coins["preferredCurrency"]["USD"] / coins["currenciesFiat"][i]["USD"]) + " "
                        : coins["preferredCurrency"]["sign"][1] + round(coins["currenciesCrypto"][i]["valueInUSD"] * coins["preferredCurrency"]["USD"]) + " "}
                  </i>
                </div>
              </button>
          );
        }
        else{
          spans.push(
              <button className='searchResult' key={i + 2000} id={i.toString()} onClick={returnCurrency}>
                <div>
                  {coins[isFiat ? "currenciesFiat" : "currenciesCrypto"][i]['name']}
                  <i key={i + 3000}>
                    {isFiat ?
                        round(coins["preferredCurrency"]["USD"] / coins["currenciesFiat"][i]["USD"]) + " " + coins["preferredCurrency"]["sign"]
                        : round(coins["currenciesCrypto"][i]["valueInUSD"] * coins["preferredCurrency"]["USD"]) + " " + coins["preferredCurrency"]["sign"]}
                  </i>
                </div>
              </button>
          );
        }
      }
    }
    else {
      spans.push(<div className="lds-ring" key={"Loading"}><div></div><div></div><div></div><div></div></div>)
    }
    setResponse(spans)
  }, [coins])

  return (
    <div className={highlight ? 'SearchBox highlight' : 'SearchBox'}>
      <h4>Select the {isFiat ? "fiat currency" : "cryptocurrency"} of this transaction</h4>
      <div className='responses extend'>
        {response}
      </div>
    </div>
  )
}

export default ChooseCurrency