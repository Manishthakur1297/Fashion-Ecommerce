import React from 'react';
import moment from 'moment';
import Image from 'react-bootstrap/Image'

const Card = ({ product }) => {   

    const showStock = stock => {
        return stock ? (
          <span className="badge badge-pill badge-primary">In Stock </span>
        ) : (
          <span className="badge badge-pill badge-danger">Out of Stock </span>
        );
    };

  return (
      <div className="cards-grid">
         <div className="card">
            <Image src={product.media.standard[0].url} fluid style={{ width: "250px", height: "320px" }}/>
            <div className="card__body">
                <h4 className="card__head">{product.name}</h4>
                <hr />
                <div className="flex_space_between">
                    <div className="card__title">
                    <span className="badge badge-pill badge-dark">{product.brand.name.substring(0, 25)}</span>
                    </div>  
                    <div className="price">
                        <div id="old">${product.price.regular_price.value}</div>
                        <div id="new">${product.price.offer_price.value}</div>
                    </div>
                </div>
                <hr />
                <p className="card__description">{product.description_text.substring(0, 80)}... </p>
                <hr />
                <div className="flex_space_between">
                  <div className="card__title">
                    {showStock(product.stock.available)}
                  </div>
                    <p className="card__content">{moment(product.created_at).fromNow()}</p>
                </div>
                
                <div id="clac">{parseInt(product.discount)}% OFF</div>
                <br />
            </div>
         </div>
      </div>
  );
}

export default Card;
