// hooks/useProducts.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProducts = ({ page, search, status }) => {
  return useQuery({
    queryKey: ["products", page, search, status],
    queryFn: async () => {
      const res = await axios.get("/api/products", {
        params: { page, limit: 10, search, status },
      });
      return res.data;
    },
    keepPreviousData: true,
  });
};

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export const useProducts = ({ page, search, status }) => {
//   return useQuery({
//     queryKey: ["products", page, search, status],
//     queryFn: async () => {
//       const res = await axios.get("/api/products", {
//         params: { page, search, status },
//       });
//       return res.data;
//     },
//     keepPreviousData: true,
//   });
// };
