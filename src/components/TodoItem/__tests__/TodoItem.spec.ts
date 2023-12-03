import { describe, it, expect, vi } from "vitest";
import { mount } from '@vue/test-utils'
import TodoItem from '../index.vue'
import { afterEach } from "node:test";
import Update from '@/components/TodoItem/Update.vue'
import type { TodoItemType } from "@/types/Todo";

const update = vi.fn()
const deleteItem = vi.fn()

function getWrapper(item?: Partial<TodoItemType>) {
    const defaultProps = {
        todo: 'todo message',
        completed: false,
        id: 1,
    }
    return mount(TodoItem, {
        propsData: {
            item: {
                ...defaultProps,
                ...item
            }
        }
    })
}

vi.mock('@/utils/queries/todos/useDelete', () => {
    return {
        useDeleteTodo: vi.fn(() => {
            return {
                mutateAsync: async (args: any) =>  deleteItem(args),
                isPending: false,
            }
        })
    }
})
vi.mock('@/utils/queries/todos/useUpdate', () => {
    return {
        useUpdateTodo: vi.fn(() => {
            return {
                mutateAsync: async (args: any) =>  update(args),
                isPending: false,
            }
        })
    }
})

describe('Todo Item', () => {
    afterEach(() => {
        vi.resetAllMocks()
    })

    it('shows todo message', () => {
        const wrapper = getWrapper()

        expect(wrapper.text()).toContain('todo message')
    })
    
    it('completed item shows crossed out message', () => {
        const wrapper = getWrapper({
            completed: true
        })

        const message = wrapper.find(`button[aria-label="Message"]`)

        expect(message.classes()).include('line-through')
    })

    it('component switches to editmode when "Edit" button is clicked', async () => {
        const wrapper = getWrapper()

        const button = wrapper.find(`button[aria-label="Edit Button"]`)

        await button.trigger('click')

        const wrapperEditMode = wrapper.findComponent(Update)
        expect(wrapperEditMode.isVisible()).toBeTruthy()
    })

    it('clicking on "Complete Button" calls useUpdateTodo mutate function passing proper arguments (toggle "complete")', async () => {
        const wrapper = getWrapper()

        const button = wrapper.find(`button[aria-label="Complete Button"]`)

        await button.trigger('click')

        expect(update).toBeCalledWith({
            completed: true
        })
    })

    it('clicking on "Todo Message" calls useUpdateTodo mutate function passing proper arguments (toggle "complete")', async () => {
        const wrapper = getWrapper()

        const button = wrapper.find(`button[aria-label="Message"]`)

        await button.trigger('click')

        expect(update).toBeCalledWith({
            completed: true
        })
    })

    it('clicking on "Delete Button" calls useDeleteTodo mutate function', async () => {
        const wrapper = getWrapper()

        const button = wrapper.find(`button[aria-label="Delete Button"]`)

        await button.trigger('click')

        expect(deleteItem).toBeCalled()
    })
})