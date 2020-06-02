import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
 
import "react-datepicker/dist/react-datepicker.css";

const DateBox = ({ handleFilters }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [myDates, setMyDates] = useState([]);
    
    const addDateFilter = (start,end) => (e) => {
        console.log(start)
        console.log(end)
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
                    newdates.push([start," | ",end])
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
                    <label key={i} className="brand-delete" onClick={removeDate(s)}>
                        {s}  <span className="brand-delete-span">X</span> </label> 
                    ))
                }<br />

                Start Date: <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                
                End Date : <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
                <br />
                <button onClick={addDateFilter(startDate,endDate)}>Add Date</button>
                <button onClick={clearDateFilter}>Clear Date</button>
            </div>
        )
    }

export default DateBox
