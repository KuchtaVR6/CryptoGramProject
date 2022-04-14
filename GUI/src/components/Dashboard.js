import React, {useState} from 'react'
import {useRef, useEffect} from 'react'

import Crypto from './Crypto.js'
import Transactions from './Transactions.js'
import Account from './Account.js'
import Prompt from './Prompt.js';
import Menu from './Menu.js';

import {Splide, SplideSlide} from "@splidejs/react-splide";

import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const Dashboard = () => {
    const [cryptoHoldings, setCryptoHoldings] = useState([])
    const [fiatHoldings, setFiatHoldings] = useState([])
    const [coins, setCoins] = useState([])
    const initRender = useRef(true)

    useEffect(() => {
        let buttons = document.querySelectorAll("[aria-label=\"Go to slide 1\"]");
        let text = document.createTextNode("Account");
        if (!buttons[0].hasChildNodes()) {
            buttons[0].appendChild(text);
        }

        buttons = document.querySelectorAll("[aria-label=\"Go to slide 2\"]");
        text = document.createTextNode("Crypto");
        if (!buttons[0].hasChildNodes()) {
            buttons[0].appendChild(text);
        }

        buttons = document.querySelectorAll("[aria-label=\"Go to slide 3\"]");
        text = document.createTextNode("Transactions");
        if (!buttons[0].hasChildNodes()) {
            buttons[0].appendChild(text);
        }

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

            fetch("/API/fetchHoldings", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if ('error' in result) {
                        if (result.error === 'Access Denied') {
                            window.location = '/login'
                        } else {
                            sessionStorage.clear()
                            window.location = '/login'
                        }
                    } else {
                        setCryptoHoldings(result.crypto)
                        setFiatHoldings(result.fiat)
                    }

                })
                .catch(() => window.location = "/error");

            token = sessionStorage.getItem('token');
            myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            raw = JSON.stringify({
                "sessionToken": token
            });

            requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("/API/fetchCurrencies", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if ('error' in result) {
                        // if (result.error === 'Access Denied'){
                        sessionStorage.clear()
                        window.location = '/login'
                        // }
                    }
                    setCoins(result)
                    setPreferred(result.preferredCurrency)
                })
                .catch(() => window.location="/error");

        };
        if (initRender.current) {
            initFetch().then(() => {

            });
            initRender.current = false
        }
    }, []);

    const [preferredCurrency, setPreferred] = useState({});

    // the super prompt
    const [showPrompt, setShowPrompt] = useState(false)

    // component shown by element
    const [component, setComponent] = useState(null)

    const popPrompt = (element) => {
        setComponent(element);
        setShowPrompt(true);
    }

    const closePrompt = () => {
        setComponent(null);
        setShowPrompt(false);
    }

    return (
        <div>
            <Menu></Menu>
            <Prompt show={showPrompt} setShow={setShowPrompt} element={component}/>
            <Splide
                options={{
                    arrows: false,
                    pagination: true,
                    keyboard: false
                }}
            >
                <SplideSlide>
                    <Account cryptoHoldings={cryptoHoldings} fiatHoldings={fiatHoldings}
                             preferredCurrency={preferredCurrency} popPrompt={popPrompt} closePrompt={closePrompt}
                             coins={coins}/>
                </SplideSlide>
                <SplideSlide>
                    <Crypto
                        setPreferred={setPreferred}
                        cryptoHoldings={cryptoHoldings}
                        fiatHoldings={fiatHoldings}
                        popPrompt={popPrompt}
                        preferredCurrency={preferredCurrency}
                        closePrompt={closePrompt}
                        coins={coins}
                    />
                </SplideSlide>
                <SplideSlide>
                    <Transactions
                        preferredCurrency={preferredCurrency}
                        setPreferred={setPreferred}
                        popPrompt={popPrompt}
                        closePrompt={closePrompt}
                        cryptoHoldings={cryptoHoldings}
                        coins={coins}
                    />
                </SplideSlide>
            </Splide>
        </div>
    )
}

export default Dashboard
