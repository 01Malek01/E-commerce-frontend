import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetProfile = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const getProfile = async () => {
    try {
      const res = await axios.get(`${backendUrl}/user/profile`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  return { profile, isLoading, isError };
};

export default useGetProfile;
