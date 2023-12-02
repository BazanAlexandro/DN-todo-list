import type { TodoItemType, TodoUpdatePayloadType } from "@/types/Todo"
import { QUERY_KEYS, apiUrl } from "@/utils/constants"
import { createToast } from "@/utils/toast"
import { useMutation, useQueryClient } from "@tanstack/vue-query"

export const useUpdateTodo = (id: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: TodoUpdatePayloadType) => {
            const res = await fetch(`${apiUrl}/todos/${id}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            return await res.json() as unknown as TodoItemType
        },
        onSuccess: (data: TodoItemType) => {
            queryClient.setQueryData([QUERY_KEYS.todos], (todos?: TodoItemType[]) => {
                return todos?.map(t => {
                    if (t.id === id) return data
                    return t
                })
            })

            createToast('Todo is updated')
        }
    })
}