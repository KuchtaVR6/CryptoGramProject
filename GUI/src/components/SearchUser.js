import React, {useEffect} from 'react'

import {useState} from 'react';

import {FaSearch} from 'react-icons/fa'

const SearchUser = ({identifier, setClient, highlight}) => {

    const [response, setResponse] = useState(<div key={9999} className='searchNotFound'><i>Please type at least 3
        characters</i></div>);
    const [clients, setClients] = useState({});

    let submission = (event) => {
        let query = document.getElementById("query").value;
        if (query.length > 2) {
            event.preventDefault()
            let formData = new FormData();
            formData.append('query', query);
            setResponse(<div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>)

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                "query": query,
                "sessionToken": sessionStorage.getItem('token')
            });

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("/API/searchUser", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if ('error' in result) {
                        if (result.error === "Access Denied") {
                            sessionStorage.clear()
                            window.alert("For security reasons, Session expired, please log in again.")
                            window.location = '/login'
                        } else {
                            window.alert("Unexpected error occurred, the page will be reloaded")
                            window.location = '';
                        }
                    }
                    setClients(result)
                })
                .catch(() => window.location = '/error');
        } else {
            setResponse(<div key={9999} className='searchNotFound'><i>Please type at least 3 characters</i></div>)
        }
    };

    const returnClient = (event) => {
        let elem = event['target'];
        while (elem.tagName !== "BUTTON") {
            elem = elem.parentElement
        }
        setClient(clients["matches"][elem.id]);
        let x = document.getElementsByClassName(identifier + ' searchResult selected');
        for (let i = 0; i < x.length; i++) {
            x[i].className = 'searchResult';
        }
        elem.className = identifier + ' searchResult selected';
    }

    useEffect(() => {
        let spans = [];
        if ("count" in clients) {
            let count = clients["count"];
            if (count === 0) {
                if (document.getElementById("query").value < 2) {
                    spans.push(<div key={9999} className='searchNotFound'><i>Please type at least 3 characters</i>
                    </div>)
                } else {
                    spans.push(<div key={9999} className='searchNotFound'><i>No matches found for your search</i></div>)
                }
            } else {
                spans.push(<div key={9999} className='searchHeader'>Full Name<i>username</i></div>)
                for (let i = 0; i < count; i++) {
                    spans.push(
                        <button className='searchResult' key={i + 2000} id={i.toString()} onClick={returnClient}>
                            <div>
                                {clients["matches"][i]['name']}
                                <i key={i + 3000}>{clients["matches"][i]['username']}</i>
                            </div>
                        </button>
                    );
                }
            }
        } else {
            if (document.getElementById("query").value < 2) {
                spans.push(<div key={9999} className='searchNotFound'><i>Please type at least 3 characters</i></div>)
            } else {
                spans.push(<div key={9999} className='searchNotFound'><i>No matches found for your search</i></div>)
            }
        }
        setResponse(spans)
    }, [clients])

    return (
        <div className={highlight ? 'SearchBox first highlight' : 'SearchBox first'}>
            <h4>Search for the recipient and select them by clicking them!</h4>
            <form>
                <input id="query" type="text" onChange={submission} required autoComplete="off"
                       placeholder="Type your search here..."></input>
                <button onClick={submission}><FaSearch/></button>
            </form>
            <div className='responses'>
                {response}
            </div>
        </div>
    )
}

export default SearchUser
