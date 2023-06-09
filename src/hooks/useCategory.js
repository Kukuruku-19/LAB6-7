import { useQuery } from "react-query";
import { $host } from "../api";

export default function useCities() {
    return useQuery(
        ["category"],
        () => $host.get("category/").then((res) => res.data),
        {
            staleTime: 120000,
        }
    );
}
