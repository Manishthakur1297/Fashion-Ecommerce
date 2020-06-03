import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
 
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";

const DateBox = ({ handleFilters }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [myDates, setMyDates] = useState([]);
    
    const addDateFilter = (start,end) => (e) => {
        if(start===null || end===null){
            alert('Please Select Date Range First!!')
        }
        else{
            let diff = moment(end).diff(moment(start), 'days');
            if(diff<0){
                alert("Please Input Date in Correct Order [ Start - End ]")
                clearDateFilter()
            }
            else{
                start = moment(start).format('YYYY-MM-DD')
                end = moment(end).format('YYYY-MM-DD')
                const currentDateId = myDates.indexOf([start,end]);
                let newdates = [...myDates]

                if (currentDateId === -1) {
                    newdates.push([start,end])
                }
                
                setMyDates(newdates)
                handleFilters(newdates);
                clearDateFilter()   
            }
        }
    }
    
    const clearDateFilter = (e) => {
        setStartDate(null)
        setEndDate(null)
    }

    const removeDate = (date) => (e) => {
        const currentDateId = myDates.indexOf(date);
        let newdates = [...myDates]

        if (currentDateId !== -1) {
            newdates.splice(currentDateId, 1);
        }
        setMyDates(newdates)
        handleFilters(newdates);
    }
    

    return (
            <div>
                { myDates.map((s,i) => (
                    <label key={i} className="badge-pill badge-info" onClick={removeDate(s)}>
                        {s[0]} |  {s[1]}  <span className="brand-delete-span">X</span> </label> 
                    ))
                }<br />
                <div className="row">
                    <div className="col-3">
                        <label>Start</label>
                    </div>
                    <div className="col-9">
                        <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        />
                    </div>
                </div>
                <br />

                
                <div className="row">
                    <div className="col-3">
                        <label>End</label>
                    </div>
                    <div className="col-9">
                        <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        />
                    </div>
                </div>
                <br />
                <div className="flex_space_between">
                    <Button variant="info" onClick={addDateFilter(startDate,endDate)}>Add Date</Button>
                    <Button variant="secondary" onClick={clearDateFilter}>Clear Date</Button>
                </div>
            </div>
        )
    }

export default DateBox
