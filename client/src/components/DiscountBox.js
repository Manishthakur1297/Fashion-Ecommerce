import React, { useState } from "react";

import { InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';

const DiscountBox = ({ handleFilters }) => {
    const [myDiscounts, setMyDiscounts] = useState([]);
    const [discount, setDiscount] = useState(0);
    // const [discountOperator, setDiscountOperator] = useState("greater_than");

    const discountChanged = event => {
        setDiscount(event.target.value)
    }

    // const operatorChanged = event => {
    //     setDiscountOperator(event.target.value)
    // }

    const pushDiscount = (discount, discountOperator) => (e) => {
        console.log(discount,discountOperator)
        if(discount===0 || discount===null || discountOperator===null){
            alert("Please Enter Discount Details Correctly!!!")
        }
        else{
            const currentDiscountId = myDiscounts.indexOf([discountOperator, discount]);
            let newDiscounts = [...myDiscounts]

            if (currentDiscountId === -1) {
                newDiscounts.push([discountOperator,discount]);
            }
            setMyDiscounts(newDiscounts)
            handleFilters(newDiscounts);
            setDiscount(0)
            // setDiscountOperator("greater_than")
        }
    }

    const removeDiscount = (discount) => (e) => {
        const currentDiscountId = myDiscounts.indexOf(discount);
        let newDiscounts = [...myDiscounts]

        if (currentDiscountId !== -1) {
            newDiscounts.splice(currentDiscountId, 1);
        }
        setMyDiscounts(newDiscounts)
        handleFilters(newDiscounts);
    }


    return(
        <div>
            { myDiscounts.map((s,i) => (
                <label key={i} className="badge-pill badge-info" onClick={removeDiscount(s)}>
                     {s[0]} -  {s[1]}  <span className="brand-delete-span">X</span> </label> 
                )) 
            }<br />

            <InputGroup>
                <FormControl type="Number"
                placeholder="Discount %"
                aria-label="discount"
                aria-describedby="basic-addon2"
                onChange={discountChanged}
                value={discount}
                />

                <DropdownButton
                as={InputGroup.Append}
                title=""
                variant="outline-secondary"
                id="input-group-dropdown-2"
                >
                    <Dropdown.Item onClick={pushDiscount(discount,"greater_than")}>Greater</Dropdown.Item>
                    <Dropdown.Item onClick={pushDiscount(discount,"smaller_than")}>Smaller</Dropdown.Item>
                    <Dropdown.Item onClick={pushDiscount(discount,"equal")}>Equal</Dropdown.Item>
                </DropdownButton>
            </InputGroup>


            {/* <input name="discount" type="Number" value={discount} onChange={discountChanged}/>
            <br /> */}
            {/* <select id="discount" name="operator" value={discountOperator} onChange={operatorChanged}>
                <option value="greater_than">Greater</option>
                <option value="smaller_than">Smaller</option>
                <option value="equal">Equal</option>
            </select>
            <input type="button" name="discount" value="Add" onClick={pushDiscount(discount,discountOperator)}/> */}

        </div>
    )}

export default DiscountBox
