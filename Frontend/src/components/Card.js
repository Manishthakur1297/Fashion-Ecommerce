import React from 'react';
import moment from 'moment';

const Card = ({ product }) => {

    const ShowImage = ({ item }) => (
        <div className="product-img">
            <img
                src={`${item.media.standard[0].url}`}
                alt={item.name}
                // className="mb-3"
                style={{ width: "250px", height: "320px" }}
            />
        </div>
    );
    
    
    const showStock = stock => {
        return stock ? (
          <span class="badge badge-pill badge-primary">In Stock </span>
        ) : (
          <span class="badge badge-pill badge-danger">Out of Stock </span>
        );
    };

    const roundToTwo = num => {    
        return +(Math.round(num + "e+2")  + "e-2");
    }



  return (
      <div class="cards-grid">
         <div class="card">
            <ShowImage item={product} />  
            <div class="card__body">
                <h4 class="card__head">{product.name}</h4>
                <hr />
                <div className="flex_space_between">
                    <div className="card__title">
                    <span class="badge badge-pill badge-dark">{product.brand.name.substring(0, 28)}</span>
                    </div>  
                    <div className="price">
                        <div id="old">${product.price.regular_price.value}</div>
                        <div id="new">${product.price.offer_price.value}</div>
                    </div>
                </div>
                <hr />
                {/* <p className="card__content">{product.description_text.substring(0, 100)} </p> */}
                <div className="flex_space_between">
                <div className="card__title">
                    {showStock(product.stock.available)}
                    </div>
                    <p className="card__content">{moment(product.created_at).fromNow()}</p>
                </div>
                
                <div id="clac">{roundToTwo(product.discount)}% OFF</div>
                <br />
            </div>
         </div>
      </div>
  );
}

export default Card;
