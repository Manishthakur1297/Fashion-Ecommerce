import React from 'react';
import moment from 'moment';

const Card = ({ product }) => {


	const ShowImage = ({ item }) => (
    <div className="product-img">
        <img
            src={`${product.media.standard[0].url}`}
            alt={item.name}
            className="mb-3"
            style={{ maxHeight: "100%", width: "100%" }}
        />
    </div>
);


	const showStock = stock => {
	    return stock ? (
	      <span className="badge badge-primary badge-pill">In Stock </span>
	    ) : (
	      <span className="badge badge-danger badge-pill">Out of Stock </span>
	    );
  };

	return (
    <div className="card ">
      <div className="card-header card-header-1 ">{product.name}</div>
      <div className="card-body">
        <ShowImage item={product} />
        <p className="card-p  mt-2">{product.description_text.substring(0, 100)} </p>
        <p className="card-p black-10">Offer Price : $ {product.price.offer_price.value}</p>
        <p className="card-p black-10">Regular Price : $ {product.price.regular_price.value}</p>
        <p className="card-p black-10">Discount : {product.discount}%</p>
        <p className="black-9">Brand: {product.brand.name}</p>
        <p className="black-8">Added on {moment(product.created_at).fromNow()}</p>
        {showStock(product.stock.available)}
        <br />
      </div>
    </div>
  );
};

export default Card;