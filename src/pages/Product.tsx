import { useParams } from "react-router-dom";
import useGetProduct from "../hooks/api/useGetProduct"; // Custom hook to fetch product details
import useAddToCart from "../hooks/api/useAddToCart";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
export default function Product() {
  const { id } = useParams<{ id: string }>(); // Extract the product ID from the URL
  const { product, isLoading, isError } = useGetProduct(id); // Fetch product details
  const {
    addProductToCart,

    isPending: isAddingToCart,
    isSuccess: addToCartSuccess,
  } = useAddToCart();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl font-bold">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl font-bold text-red-500">
        Error fetching product, Or Product not found.
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl font-bold">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = async () => {
    await addProductToCart(product._id);
  };
  return (
    <div className="product-page p-8">
      <div className="product-container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image mb-4">
            <img
              src={product.images[0]} // Display the first image as the main image
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="thumbnail-grid grid grid-cols-4 gap-2">
            {product.images.slice(1).map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75"
                onClick={() => console.log("Switch to image:", image)} // Add functionality to switch images
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="product-details">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <div className="ratings mb-4">
            <span className="text-yellow-500">
              {Array(Math.floor(product.ratings))
                .map((_, index) => (
                  <span key={index}>⭐️</span>
                ))}
              {Array(5 - Math.floor(product.ratings))
                .map((_, index) => (
                  <span key={index}>☆</span>
                ))}
            </span>{" "}
            {/* Replace with dynamic rating logic */}
            <span className="text-gray-600">({product.ratings} reviews)</span>
          </div>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="product-meta mb-6">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">In Stock:</span>{" "}
              {product.stock > 0 ? "Yes" : "No"}
            </p>
          </div>
          <div className="actions flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg border border-black"
            >
              {isAddingToCart ? (
                <div className="flex items-center gap-2">Adding to cart...</div>
              ) : addToCartSuccess ? (
                <IoMdCheckmarkCircleOutline className="text-green-500 text-2xl" />
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
