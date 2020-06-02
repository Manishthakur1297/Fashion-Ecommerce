import React, { useState } from "react";

const StockBox = ({ handleFilters }) => {
    const stocks = [{'key': 'IN','value':true},{'key': 'OUT','value': false}]
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

    return stocks.map((s,i) => (
        //console.log(s,i)
        <li key={i} className="list-unstyled">
            <input
                onChange={handleToggle(s.value)}
                value={checked.indexOf(s.value === -1)}
                type="checkbox"
                className="form-check-input"
            />
            <label className="form-check-label">{s.key}</label>
        </li>
    ));
};

export default StockBox;
