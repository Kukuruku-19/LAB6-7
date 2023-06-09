import { $host } from ".";

export const getOne = async (id) => {
    return $host.get(`/company/${id}`)
}