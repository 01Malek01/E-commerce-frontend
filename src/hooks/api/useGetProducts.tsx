import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const useGetProducts = () => {
  const getProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/products`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { products, isLoading, isError };
};

export default useGetProducts;
