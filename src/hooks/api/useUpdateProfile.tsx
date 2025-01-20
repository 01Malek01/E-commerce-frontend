import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useUpdateProfile = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
  const updateProfile = async (data: {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
  }) => {
    try {
      await axios.post(`${backendUrl}/user/profile`, data);
    } catch (error) {
      console.log(error);
    }
  };
  const {
    mutateAsync: updateUserProfile,
    isPending,
    isError,
  } = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["updateProfile"],
  });
  return { updateUserProfile, isPending, isError };
};
export default useUpdateProfile;
