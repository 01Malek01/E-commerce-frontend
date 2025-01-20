import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const useGetOrders = () => {
  const getOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/orders`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return { orders, isLoading, isError };
};

export default useGetOrders;