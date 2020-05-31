import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts, getFilteredProducts } from './apiCore';
import Card from './Card';

const App = () => {
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);

    const [myFilters, setMyFilters] = useState({
        //filters: {discount:[], brand:"", created_at: [], stock_available: true}
        filters: {
            discount : { value: null, operator: 'greater_than' } ,
            brand : { value: null, operator: 'contains' } ,
            stock : { value: null, operator: 'equals' }
            //created_at : { value: [], operator: 'between' }
        }
    })

    const [filteredResults, setFilteredResults] = useState([]);

    const inputChanged = event => {
        let newFilters = { ...myFilters };

        if(event.target.name==="operator"){
            newFilters.filters[event.target.id].operator = event.target.value
        }
        else{
            newFilters.filters[event.target.name].value = event.target.value
        }

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters)
    }

    const loadProductsByArrival = () => {
        getProducts('created_at').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
                setSize(data.size);
                //setSkip(toSkip);
            }
        });
    };


    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                //console.log(data)
                setFilteredResults(data.products);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    useEffect(() => {
        //loadProductsByArrival();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);


    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.products]);
                setSize(data.size);
                setSkip(toSkip);
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


    return (

        <Layout
            title="Filter Page"
            description="Search and find Products of your choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">
                    <h4>Filter 1 by Discount</h4>
                    <div>
                        <input name="discount" type="Number" onChange={inputChanged}/>
                        <select id="discount" name="operator" onChange={inputChanged}>
                            <option value="greater_than">Greater</option>
                            <option value="smaller_than">Smaller</option>
                            <option value="equal">Equal</option>
                        </select>
                    </div>
                    <br />

                    <h4>Filter 2 by Brand name</h4>
                    <div>
                        <input name="brand" type="text" onChange={inputChanged}/>

                    </div>
                    <br />

                    <h4>Filter3 by stock</h4>
                    <div>
                        <input type="radio" name="stock" value="true" onChange={inputChanged}/> IN
                        <input type="radio" name="stock" value="false" onChange={inputChanged}/> OUT<br />

                    </div>

                    {/* <h4>Filter4 by Date Range</h4>
                    <div>
                        <input type="radio" name="date" value="IN" /> IN
                        <input type="radio" name="date" value="OUT" /> OUT<br />

                    </div> */}

                </div>


                <div className="col-9">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
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