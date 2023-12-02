import type { TodoItemType } from "@/types/Todo"
import { QUERY_KEYS, apiUrl } from "@/utils/constants"
import { createToast } from "@/utils/toast"
import { useMutation, useQueryClient } from "@tanstack/vue-query"

export const useDeleteTodo = (id: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            return await fetch(`${apiUrl}/todos/${id}`, {
                method: 'delete'
            })
        },
        onSuccess: () => {
            queryClient.setQueryData([QUERY_KEYS.todos], (todos?: TodoItemType[]) => {
                return todos?.filter(t => t.id !== id)
            })

            createToast('Todo is deleted')
        }
    })
}