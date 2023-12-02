<script setup lang="ts">
import { EditOutlined, DeleteOutlined, Loading3QuartersOutlined } from '@ant-design/icons-vue'
import type { TodoItemType } from '@/types/Todo'
import { useDeleteTodo } from '@/utils/queries/todos/useDelete';

const buttonClass = 'flex items-center p-2 hover:bg-primary-400 rounded transition'

const props = defineProps<{
    item: TodoItemType
}>()

const { item } = props
const { mutateAsync: deleteTodo, isPending: isDeleting } = useDeleteTodo(item.id)

async function onDelete() {
    await deleteTodo()
}
</script>

<template>
    <div class="flex px-5 py-3 bg-primary-500 text-white rounded-lg flex items-center gap-4">
        <button class="w-4 h-4 rounded-full border border-white shrink-0" />
        <button class="font-bold text-start">{{ item.todo }}</button>

        <div class="flex gap-1 items-center ml-auto">
            <template v-if="isDeleting">
                <Loading3QuartersOutlined
                    class="px-4 flex text-white items-center justify-center text-lg animate-spin" />
            </template>
            <template v-else>
                <button :class="buttonClass">
                    <EditOutlined />
                </button>

                <button @click="onDelete" :class="buttonClass">
                    <DeleteOutlined />
                </button>
            </template>
        </div>
    </div>
</template>