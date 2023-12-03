import { useQuery } from "@tanstack/vue-query"
import { QUERY_KEYS, apiUrl } from "../../constants"
import type { TodoItemType } from "@/types/Todo"
import { getPersistedState } from "@/utils/persistance"
import { fetchApi } from "@/utils/fetchApi"

export const useFetchTodos = () => {
    return useQuery<TodoItemType[]>({
        queryKey: [QUERY_KEYS.todos],
        queryFn: async () => {
            const persisted = getPersistedState()
            if (persisted) return persisted

            const res = await fetchApi('/todos')

            const data = await res.json() as unknown as { todos: TodoItemType[] }
            return data.todos
        }
    })
}