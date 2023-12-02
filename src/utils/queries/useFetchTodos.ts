import { useQuery } from "@tanstack/vue-query"
import { apiUrl } from "../constants"

export const useFetchTodos = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const res = await fetch(`${apiUrl}/todos`)

            return res.json()
        }
    })
}