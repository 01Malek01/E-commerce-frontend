import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useCreateOrder = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const createOrder = async (details) => {
    try {
      const response = await axios.post(`${backendUrl}/orders`, {
        details,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const {
    mutateAsync: createOrderAsync,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log(data);
    },
    mutationKey: ["createOrder"],
  });
  return { createOrderAsync, isError, isPending, isSuccess };
};

export default useCreateOrder;
