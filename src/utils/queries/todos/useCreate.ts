import { type TodoCreationPayloadType, type TodoItemType } from "@/types/Todo"
import { QUERY_KEYS, apiUrl } from "@/utils/constants"
import { useMutation, useQueryClient } from "@tanstack/vue-query"

export const useCreate = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: TodoCreationPayloadType) => {
            const res = await fetch(`${apiUrl}/todos/add`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...payload,
                    userId: 4 // todo: thing of users
                })
            })

            return res.json()
        },
        onSuccess: (data: TodoItemType) => {
            queryClient.setQueryData([QUERY_KEYS.todos], (todos?: TodoItemType[]) => {
                return [...(todos ?? []), data]
            })
        }
    })
}