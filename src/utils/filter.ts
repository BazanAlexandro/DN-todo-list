import type { FilterType } from "@/types/Filter"
import type { TodoItemType } from "@/types/Todo"

export function filterTodos(todos: TodoItemType[] | undefined, filter: FilterType) {
    const { search, completed } = filter

    console.log('completed', completed)
    if (!todos) return

    let result = todos

    if (search) result = result.filter(t => t.todo.toUpperCase().includes(search.toUpperCase()))
    if (completed !== undefined) result = result.filter(t => t.completed === completed)

    return result
}
