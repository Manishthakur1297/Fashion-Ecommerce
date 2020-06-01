import React, { useState } from "react";

const DiscountBox = ({ handleFilters }) => {
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
                <label key={i} className="brand-delete" onClick={removeBrand(s)}>
                     {s}  <span className="brand-delete-span">X</span> </label> 
                )) 
            }<br />
            
            <input
                onChange={inputChanged}
                type="text"
                name="brand"
                value={brand}
            />
            <input type="button" name="brand" value="Add" onClick={pushBrand(brand)}/>

        </div>
    )}

export default DiscountBox
