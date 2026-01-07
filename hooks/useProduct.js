import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`/api/products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
