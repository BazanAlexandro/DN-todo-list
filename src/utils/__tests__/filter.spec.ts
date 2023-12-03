import type { TodoItemType } from '@/types/Todo'
import { describe, it, expect } from 'vitest'
import todosData from '@/utils/test/todos.json'
import { filterTodos } from '../filter'
import type { FilterType } from '@/types/Filter'

const todos: TodoItemType[] = todosData.todos

describe('filtering todos', () => {
    it('filters by search string', () => {
        const search = 'ab'

        const res = filterTodos(todos, { search })
        const expected = todos.filter(t => t.todo.includes(search))

        expect(res).toStrictEqual(expected)
    })

    it('filters by search string case insensitive', () => {
        const search = 'TEST'

        const res = filterTodos(todos, { search })
        const expected = todos.filter(t => t.todo.includes(search.toLowerCase()))

        expect(res).toStrictEqual(expected)
    })

    it('filters by completed filter', () => {
        const filter: FilterType = {
            completed: true
        }

        const res = filterTodos(todos, filter)
        const expected = todos.filter(t => t.completed === true)

        expect(res).toStrictEqual(expected)
    })

    it('filters by search and completed filter', () => {
        const filter: FilterType = {
            completed: true,
            search: 'te'
        }

        const res = filterTodos(todos, filter)
        const expected = todos.filter(t => t.completed === true && t.todo.includes('te'))

        expect(res).toStrictEqual(expected)
    })
})