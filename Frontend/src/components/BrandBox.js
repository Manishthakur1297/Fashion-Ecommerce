import React, { useState } from "react";
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const BrandBox = ({ handleFilters }) => {
    const [myBrands, setMyBrands] = useState([]);
    const [brand, setBrand] = useState("");

    const inputChanged = event => {
        setBrand(event.target.value)
    }

    const pushBrand = (brand) => (e) => {
        const currentBrandId = myBrands.indexOf(brand);
        let newbrands = [...myBrands]

        if (currentBrandId === -1) {
            newbrands.push(brand);
        }
        setMyBrands(newbrands)
        handleFilters(newbrands);
        setBrand("")
    }

    const removeBrand = (brand) => (e) => {
        const currentBrandId = myBrands.indexOf(brand);
        let newbrands = [...myBrands]

        if (currentBrandId !== -1) {
            newbrands.splice(currentBrandId, 1);
        }
        setMyBrands(newbrands)
        handleFilters(newbrands);
    }


    return(
        <div>
            
                { myBrands.map((s,i) => (
                <label key={i} className="badge-pill badge-info" onClick={removeBrand(s)}>
                     {s}  <span className="brand-delete-span">X</span> </label> 
                )) 
            }<br />

            <InputGroup className="mb-3">
                <FormControl
                placeholder="Brand Name"
                aria-label="brand"
                aria-describedby="basic-addon2"
                value={brand}
                onChange={inputChanged}
                />
                <InputGroup.Append>
                <Button variant="outline-secondary" onClick={pushBrand(brand)}>Search</Button>
                </InputGroup.Append>
            </InputGroup>           
    </div>
    )}

export default BrandBox
