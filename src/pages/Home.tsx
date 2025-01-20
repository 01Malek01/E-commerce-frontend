import { useEffect, useState } from "react";
import useGetProducts from "../hooks/api/useGetProducts";
import ProductCard from "../components/Card";
import { Product } from "../types";

export default function Home() {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { products, isError, isLoading } = useGetProducts();

  useEffect(() => {
    if (products?.length > 0 && !isLoading && !isError) {
      setFetchedProducts(products);
      setFilteredProducts(products); // Initialize filteredProducts with all products
    }
  }, [products, isError, isLoading]);

  useEffect(() => {
    // Filter products based on search term
    const filtered = fetchedProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, fetchedProducts]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-3xl font-bold">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-3xl font-bold">
        Error...
      </div>
    );

  return (
    <div className="home">
      <div className="home__filter-options flex flex-col md:flex-row justify-between items-center p-4 gap-4">
        <div className="search-bar w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a product"
            className="px-4 w-full py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
        <div className="home__filter-options-filter-buttons flex flex-wrap gap-2">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg border border-black"
            onClick={() => setFilteredProducts(fetchedProducts)}
          >
            All
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg border border-black"
            onClick={() =>
              setFilteredProducts(
                fetchedProducts.filter(
                  (product: Product) => product?.category === "Electronics"
                )
              )
            }
          >
            Electronics
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg border border-black"
            onClick={() =>
              setFilteredProducts(
                fetchedProducts.filter(
                  (product: Product) =>
                    product.category === "Health & Personal Care"
                )
              )
            }
          >
            Health & Personal Care
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg border border-black"
            onClick={() =>
              setFilteredProducts(
                fetchedProducts.filter(
                  (product: Product) => product.category === "Home & Kitchen"
                )
              )
            }
          >
            Home & Kitchen
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg border border-black"
            onClick={() =>
              setFilteredProducts(
                fetchedProducts.filter(
                  (product: Product) => product.category === "Sports & Fitness"
                )
              )
            }
          >
            Sports & Fitness
          </button>
        </div>
      </div>
      <div className="home__products  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:p-4">
        {filteredProducts?.length > 0
          ? filteredProducts.map((product: Product) => (
              <ProductCard
                _id={product._id}
                key={product._id}
                name={product.name}
                price={product.price}
                brand={product.brand}
                category={product.category}
                stock={product.stock}
                description={product.description}
                images={product.images}
                ratings={product.ratings}
              />
            ))
          : fetchedProducts.map((product: Product) => (
              <ProductCard
                _id={product._id}
                key={product._id}
                name={product.name}
                price={product.price}
                brand={product.brand}
                category={product.category}
                stock={product.stock}
                description={product.description}
                images={product.images}
                ratings={product.ratings}
              />
            ))}
      </div>
    </div>
  );
}
