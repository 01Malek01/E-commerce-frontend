import React from "react";

// Define the props interface
interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[]; // Array of image URLs
  stock: number;
  rating: number; // Rating out of 5
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  category,
  brand,
  images,
  stock,
  rating,
}) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md p-4 mx-auto mt-10">
      {/* Product Image */}
      <div className="product-image mb-4">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h2 className="text-lg font-bold mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-lg font-bold mb-2">
          <strong>Price:</strong> ${price.toFixed(2)}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Category:</strong> {category}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Brand:</strong> {brand}
        </p>
        <p className={`text-${stock > 0 ? "green" : "red"}-600 mb-2`}>
          <strong>Stock:</strong>{" "}
          {stock > 0 ? `${stock} available` : "Out of stock"}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Rating:</strong> {rating}/5
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
