import { watch, type Ref } from "vue"
import { STATE_PERSISTANCE_KEY } from "./constants"
import type { TodoItemType } from "@/types/Todo"

export function usePersist<T>(key: string, value: Ref<T>) {
    watch(value, () => {
        localStorage.setItem(key, JSON.stringify(value.value))
    })
}

export function usePersistState(value: Ref<TodoItemType[] | undefined>) {
    usePersist(STATE_PERSISTANCE_KEY, value)
}

export function getPersistedState() {
    try {
        const serialized = localStorage.getItem(STATE_PERSISTANCE_KEY)

        if (serialized) {
            return JSON.parse(serialized) as TodoItemType[]
        }
    } catch (e) {
        console.error(e)
        return null
    }
}