import React, { useState } from "react";
import { Form } from 'react-bootstrap';

const StockBox = ({ handleFilters }) => {
    const stocks = [{'key': 'Available','value':true},{'key': 'Not Available','value': false}]
    const [checked, setCheked] = useState([]);

    const handleToggle = c => () => {
        const currentStockId = checked.indexOf(c);
        const newCheckedStockId = [...checked];

        if (currentStockId === -1) {
            newCheckedStockId.push(c);
        } else {
            newCheckedStockId.splice(currentStockId, 1);
        }
        console.log(newCheckedStockId);
        setCheked(newCheckedStockId);
        handleFilters(newCheckedStockId);
    };

    return (
    <Form>
    <div key="inline-checkbox" className="mb-3">
        <div>
            { stocks.map((s,i) => (
               <div key={i}>
                    <Form.Check
                    inline label={s.key} type="checkbox" 
                    id={i} 
                    onChange={handleToggle(s.value)}
                    value={checked.indexOf(s.value === -1)}/>
                </div>     
    )) }
        </div>
        </div>
    </Form>
    )};

export default StockBox;
