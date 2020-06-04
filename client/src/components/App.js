import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getFilteredProducts } from './apiCore';
import Card from './Card';
import StockBox from './StockBox';
import BrandBox from './BrandBox';
import DiscountBox from './DiscountBox';
import DateBox from './DateBox';

import './App.css';

const App = () => {
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);

    const [filteredResults, setFilteredResults] = useState([]);

    const [myFilters, setMyFilters] = useState({
        filters: {
            stock: [],
            brand: [],
            created_at: [],
            discount: []
        }
    })

    const loadFilteredResults = (skip, limit, newFilters) => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.products);
                setSize(data.size);
                setSkip(0);
                setLimit(6)
            }
        });
    };


    useEffect(() => {
        
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);


    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
                console.log(error)
            } else {
                setFilteredResults([...filteredResults, ...data.products]);
                setSize(data.size);
                if(data.size<limit){
                    setSkip(0)
                }
                else{
                    setSkip(toSkip);
                } 
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
            
           
        );
    };

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        setSkip(0);
        setLimit(6)
        setMyFilters(newFilters);
        loadFilteredResults(skip,limit,myFilters.filters);
    };

    return (

        <Layout
            title="Search Products By Filters"
            description="Search and find Products of your choice"
            className="container-fluid"
        >
        <div className="row">
            <div className="col-2">
                <h4>Filter by Discount(%)</h4>
                    <div>
                        <DiscountBox
                            handleFilters={filters =>
                                handleFilters(filters, "discount") }
                        />
                    </div>
                    <br />

                <h4>Filter by Brand</h4>
                    <div>
                        <BrandBox
                            handleFilters={filters =>
                                handleFilters(filters, "brand") }
                        />
                    </div>
                    <br />

                <h4>Filter by Stock</h4>
                    <div>
                        <ul>
                            <StockBox
                                handleFilters={filters =>
                                    handleFilters(filters, "stock") }
                            />
                        </ul>
                    </div>
                    <br />

                <h4>Filter by Date</h4>
                    <div>
                        <DateBox
                            handleFilters={filters =>
                                handleFilters(filters, "created_at") }
                        />
                    </div>
                    <br />

                </div>
                
                <div className="col-1">

                </div>
                
                <div className="col-9">
                    {/* <h2 className="mb-4">Products</h2> */}
                    <div className="row flex_space_between">
                        {filteredResults.map((product, i) => (
                            <div key={i}>
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                   {loadMoreButton()}
                </div>
            </div>
        </Layout>
    );
};

export default App;