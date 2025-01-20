import React from "react";
import { Product } from "../types";
import useAddToCart from "../hooks/api/useAddToCart";
import { Link } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

// Define the props interface

const ProductCard: React.FC<Product> = ({
  _id,
  name,
  description,
  price,
  category,
  brand,
  images,
  stock,
  ratings,
}) => {
  const { addProductToCart, isError, isPending, isSuccess } = useAddToCart();

  const handleAddToCart = async () => {
    await addProductToCart(_id);
  };
  return (
    <div className="product-card w-96 h-auto bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between">
      {/* Product Image */}
      <Link to={`/product/${_id}`}>
        <div className="product-card__image mb-4">
          <img
            src={images[0]}
            alt={name}
            className="product-card__image--main w-full h-64 object-cover rounded-lg"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="product-card__details">
        <h2 className="product-card__title text-lg font-bold mb-2">{name}</h2>
        <p className="product-card__description text-gray-600 mb-4">
          {description}
        </p>
        <p className="product-card__price text-lg font-bold mb-2">
          <strong>Price:</strong> ${price.toFixed(2)}
        </p>
        <p className="product-card__category text-gray-600 mb-2">
          <strong>Category:</strong> {category}
        </p>
        <p className="product-card__brand text-gray-600 mb-2">
          <strong>Brand:</strong> {brand}
        </p>
        <p
          className={`product-card__stock text-${
            stock > 0 ? "green" : "red"
          }-600 mb-2`}
        >
          <strong>Stock:</strong>{" "}
          {stock > 0 ? `${stock} available` : "Out of stock"}
        </p>
        <p className="product-card__rating text-gray-600 mb-2">
          <strong>Rating:</strong> {ratings}/5
        </p>
      </div>
      <div className="product-card__actions flex flex-row justify-start gap-4">
        {/* Add to Cart Button */}
        <Link to={`/product/${_id}`}>
          <button className="  product-card__view text-black outline outline-2 hover:bg-black hover:text-white transition-all duration-150 px-4 py-2 rounded-lg">
            View{" "}
          </button>
        </Link>
        <button
          onClick={handleAddToCart}
          className="product-card__add-to-cart text-black outline outline-2 hover:bg-black hover:text-white transition-all duration-150 px-4 py-2 rounded-lg"
        >
          {isPending ? (
            "Adding to Cart..."
          ) : isSuccess ? (
            <IoMdCheckmarkCircleOutline className="text-green-600" />
          ) : isError ? (
            "Error adding to Cart"
          ) : (
            "Add to Cart"
          )}{" "}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
