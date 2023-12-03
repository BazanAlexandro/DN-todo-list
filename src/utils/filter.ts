import type { FilterType } from "@/types/Filter"
import type { TodoItemType } from "@/types/Todo"

export function filterTodos(todos: TodoItemType[] | undefined, filter: FilterType) {
    const { search, completed } = filter
    if (!todos) return

    let result = todos

    if (search) result = result.filter(t => t.todo.toUpperCase().includes(search.toUpperCase()))

    return result
}
