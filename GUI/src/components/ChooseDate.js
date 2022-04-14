import React from 'react'

import {useState} from 'react';

const ChooseDate = ({setDate,setTime}) => {
    const [isChecked, setIsChecked] = useState(false);

    const invalidate = (element) => {
        element.className = "invalid";
    }

    const revalidate = (element) => {
        element.className = ''
    }

    const handleOnChange = () => {
        setIsChecked(document.getElementById("checkbox-3").checked);
        if(document.getElementById("checkbox-3").checked){
            setDate("now");
            setTime("now");
        }
        else if(!(document.getElementById("checkbox-3").checked)){
            let dateNTime;
            if (document.getElementById("timeInput").value === null){
                dateNTime = new Date(document.getElementById("dateInput") + " " + document.getElementById("timeInput"));
            }
            else{
                dateNTime = new Date(document.getElementById("dateInput") + " " + document.getElementById("timeInput"));
            }

            const pushDate = () => {
                let dateElem = document.getElementById("dateInput")
                let timeElem = document.getElementById("timeInput");
                if (new Date(dateElem.value+" "+timeElem.value).getTime()<new Date().getTime()){
                    invalidate(dateElem)
                    invalidate(timeElem)
                    return false;
                }
                else{
                    revalidate(dateElem)
                    revalidate(timeElem)
                    return true;
                }
            }
            if (pushDate(dateNTime))
                setDate(document.getElementById("dateInput").value);
            setTime(document.getElementById("timeInput").value);
        }
    };

    return (
        <div className='sendDateBox'>
            <div className="checkboxContainer">
                <input type="checkbox" id="checkbox-3" onChange={handleOnChange}/>
                <label htmlFor="checkbox-3">Send instantly</label>
            </div>
            <span className='increaseSize'></span>
            <br />
            <div className='dateNTimeBox'>
                <div className='dateInput'>
                    <label htmlFor="dateInput" style={{ display: isChecked ? "none" : "inline" }}>Date:</label>
                    <input id="dateInput" type="date" onChange={handleOnChange} style={{ display: isChecked ? "none" : "inline" }} autoComplete="off" placeholder="Choose date for the request"/><br/>
                </div>
                <div className='timeInput'>
                    <label htmlFor="timeInput" style={{ display: isChecked ? "none" : "inline" }}>Time:</label>
                    <input id="timeInput" type="time" onChange={handleOnChange} style={{ display: isChecked ? "none" : "inline" }} autoComplete="off" placeholder="Choose time for the request"/>
                </div>
            </div>
            <span style={{ display: isChecked ? "inline" : "none" }}> Sending Instantly </span>
        </div>
    )
}

export default ChooseDate