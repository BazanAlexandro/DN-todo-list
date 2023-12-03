import { type TodoCreationPayloadType, type TodoItemType } from "@/types/Todo"
import { QUERY_KEYS } from "@/utils/constants"
import { fetchApi } from "@/utils/fetchApi"
import { useMutation, useQueryClient } from "@tanstack/vue-query"

export const useCreateTodo = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: TodoCreationPayloadType) => {
            const res = await fetchApi('/todos/add', {
                method: 'post',
                body: {
                    ...payload,
                    userId: 4 // todo: think of users
                }
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