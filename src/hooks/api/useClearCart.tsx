import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useClearCart = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const clearCart = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/products/clear-cart`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const { mutateAsync: clearCartAsync } = useMutation({
    mutationFn: clearCart,
    onSuccess: (data) => {
      console.log(data);
    },
    mutationKey: ["clearCart"],
  });
  return { clearCartAsync };
};

export default useClearCart;
