import { useQuery } from "@tanstack/vue-query"
import { apiUrl } from "../constants"
import type { TodoItemType } from "@/types/Todo"

export const useFetchTodos = () => {
    return useQuery<{ todos: TodoItemType[] }>({
        queryKey: ['todos'],
        queryFn: async () => {
            const res = await fetch(`${apiUrl}/todos`)

            return res.json()
        }
    })
}