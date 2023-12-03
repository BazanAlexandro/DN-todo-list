import { useQuery } from "@tanstack/vue-query"
import { QUERY_KEYS, apiUrl } from "../../constants"
import type { TodoItemType } from "@/types/Todo"
import { getPersistedState } from "@/utils/persistance"

export const useFetchTodos = () => {
    return useQuery<TodoItemType[]>({
        queryKey: [QUERY_KEYS.todos],
        queryFn: async () => {
            const persisted = getPersistedState()
            if (persisted) return persisted

            const res = await fetch(`${apiUrl}/todos`)

            const data = await res.json() as unknown as { todos: TodoItemType[] }
            return data.todos
        }
    })
}