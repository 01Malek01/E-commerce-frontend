import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useAddToCart = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const addToCart = async (productId: string) => {
    try {
      const response = await axios.post(
        `${backendUrl}/products/${productId}/add-to-cart`,
        {
          productId,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const {
    mutateAsync: addProductToCart,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      console.log(data);
    },
    mutationKey: ["addToCart"],
  });
  return { addProductToCart, isError, isPending, isSuccess };
};

export default useAddToCart;
