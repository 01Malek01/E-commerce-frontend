import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const useGetCart = () => {
  const getCart = async () => {
    try {
      const response = await axios.get(`${backendUrl}/products/cart`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const {
    data: cart,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  return { cart, isLoading, isError };
};

export default useGetCart;
