import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetPRoduct = (id: string | undefined) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const getProduct = async () => {
    try {
      const res = await axios.get(`${backendUrl}/products/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: getProduct,
    enabled: !!id, // only fetch data when id is provided
  });
  return { product, isLoading, isError };
};

export default useGetPRoduct;
