import { vi } from "vitest";

vi.mock('@/utils/queries/todos/useDelete', () => {
    return {
        useDeleteTodo: vi.fn(() => {
            return {
                mutateAsync: async () =>  {},
                isPending: false,
            }
        })
    }
})
vi.mock('@/utils/queries/todos/useUpdate', () => {
    return {
        useUpdateTodo: vi.fn(() => {
            return {
                mutateAsync: async () =>  {},
                isPending: false,
            }
        })
    }
})