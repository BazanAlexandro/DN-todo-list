<script setup lang="ts">
import type { TodoItemType } from '@/types/Todo';
import { useDeleteTodo } from '@/utils/queries/todos/useDelete';
import { useUpdateTodo } from '@/utils/queries/todos/useUpdate';
import { DeleteOutlined, EditOutlined, Loading3QuartersOutlined } from '@ant-design/icons-vue';

const props = defineProps<{
    item: TodoItemType
}>()

const emit = defineEmits<{
    edit: []
}>()

const { mutateAsync: deleteTodo, isPending: isDeleting } = useDeleteTodo(props.item.id)
const { mutateAsync: updateTodo, isPending: isUpdating } = useUpdateTodo(props.item.id)

async function onDelete() {
    await deleteTodo()
}

async function toggleCompleted() {
    if (isDeleting.value || isUpdating.value) return

    await updateTodo({
        completed: !props.item.completed
    })
}

const buttonClass = 'flex items-center justify-center w-8 h-8 hover:bg-primary-400 rounded transition'
</script>

<template>
    <div
        class="pl-5 pr-2 min-h-[48px] py-1 flex gap-4 w-full bg-primary-500 transition"
        :class="item.completed && 'bg-white text-gray-600'"
    >
        <div class="flex items-center gap-4 flex-1">
            <button
                @click="toggleCompleted"
                class="w-4 h-4 rounded-full border border-current shrink-0 hover:scale-125 transition"
                :class="item.completed && 'bg-current'"
                aria-label="Complete Button"
            />

            <button
                @click="toggleCompleted"
                class="font-bold text-start text-sm flex-1"
                :class="item.completed && 'line-through'"
                aria-label="Message"
            >
                {{ item.todo }}
            </button>
        </div>

        <div class="flex gap-1 items-center ml-auto h-inherit">
            <template v-if="isDeleting || isUpdating">
                <Loading3QuartersOutlined class="px-4 flex items-center justify-center text-lg animate-spin" />
            </template>
            <template v-else>
                <button
                    :class="buttonClass"
                    @click="emit('edit')"
                    aria-label="Edit Button"
                >
                    <EditOutlined />
                </button>

                <button
                    @click="onDelete"
                    :class="buttonClass"
                    aria-label="Delete Button"
                >
                    <DeleteOutlined />
                </button>
            </template>
        </div>
    </div>
</template>