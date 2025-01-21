import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useRemoveFromCart = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const removeFromCart = async (productId: string) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/products/${productId}/remove-from-cart`,
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
    mutateAsync: removeProductFromCart,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: (data) => {
      console.log(data);
    },
    mutationKey: ["removeFromCart"],
  });
  return { removeProductFromCart, isError, isPending, isSuccess };
};

export default useRemoveFromCart;
