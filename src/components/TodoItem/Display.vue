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
    await updateTodo({
        completed: !props.item.completed
    })
}

const buttonClass = 'flex items-center justify-center w-8 h-8 h-full hover:bg-primary-400 rounded transition'
</script>

<template>
    <div class="pl-5 pr-2 min-h-[48px] py-1 flex items-center gap-4 w-full">
        <button @click="toggleCompleted" class="w-4 h-4 rounded-full border border-white shrink-0"
            :class="props.item.completed && 'bg-white'" />
        <button @click="toggleCompleted" class="font-bold text-start text-sm"
            :class="props.item.completed && 'line-through'">
            {{ item.todo }}
        </button>

        <div class="flex gap-1 items-center ml-auto h-full">
            <template v-if="isDeleting || isUpdating">
                <Loading3QuartersOutlined class="px-4 flex text-white items-center justify-center text-lg animate-spin" />
            </template>
            <template v-else>
                <button :class="buttonClass" @click="emit('edit')">
                    <EditOutlined />
                </button>

                <button @click="onDelete" :class="buttonClass">
                    <DeleteOutlined />
                </button>
            </template>
        </div>
    </div>
</template>