import { describe, it, expect, vi } from "vitest";
import { mount } from '@vue/test-utils'
import { afterEach } from "node:test";
import Update from '@/components/TodoItem/Update.vue'
import type { TodoItemType } from "@/types/Todo";

const update = vi.fn()

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

function getWrapper(item?: Partial<TodoItemType>) {
    const defaultProps = {
        todo: 'todo message',
        completed: false,
        id: 1,
    }

    return mount(Update, {
        propsData: {
            item: {
                ...defaultProps,
                ...item
            }
        }
    })
}

describe('Update Item', () => {
    afterEach(() => {
        vi.resetAllMocks()
    })

    it('typing a word and pressing "Apply Button" calls useUpdateTodo mutation fn with proper args', async () => {
        const wrapper = getWrapper()

        const input = wrapper.find('input')
        input.setValue('test')
        await input.trigger('input')

        const button = wrapper.find('button[aria-label="Apply Button"]')

        await button.trigger('submit')

        expect(update).toBeCalledWith({
            todo: 'test'
        })
    })

    it('empty input does not allow to save', async () => {
        const wrapper = getWrapper({
            todo: ''
        })

        const input = wrapper.find('input')
        input.setValue('')
        await input.trigger('input')

        const button = wrapper.find('button[aria-label="Apply Button"]')

        expect(button.attributes().disabled).toBe('')
    })

    it('pressing "Cancel Button" triggers cancel event', async () => {
        const wrapper = getWrapper()

        const button = wrapper.find('button[aria-label="Cancel Button"]')
        await button.trigger('click')

        expect(wrapper.emitted('cancel')).toBeTruthy()
    })
})