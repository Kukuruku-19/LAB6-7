import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { $host } from "../api";

export default function useCompanies() {
    const [search] = useSearchParams();

    return useQuery(
        ["product", search.toString()],
        () =>
            $host
                .get("product/", {
                    params: search,
                })
                .then((res) => res.data),
        {
            staleTime: 120000,
        }
    );
}
