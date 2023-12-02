<script setup lang="ts">
import { EditOutlined, DeleteOutlined, Loading3QuartersOutlined } from '@ant-design/icons-vue'
import type { TodoItemType } from '@/types/Todo'
import { useDeleteTodo } from '@/utils/queries/todos/useDelete';
import { ref } from 'vue';
import UpdateItem from './UpdateItem.vue';
import { useUpdateTodo } from '@/utils/queries/todos/useUpdate';

const buttonClass = 'flex items-center p-2 hover:bg-primary-400 rounded transition'

const props = defineProps<{
    item: TodoItemType
}>()

const { mutateAsync: deleteTodo, isPending: isDeleting } = useDeleteTodo(props.item.id)
const { mutateAsync: updateTodo, isPending: isUpdating } = useUpdateTodo(props.item.id)
const editMode = ref(false)

async function onDelete() {
    await deleteTodo()
}

async function toggleCompleted() {
    await updateTodo({
        completed: !props.item.completed
    })
}
</script>

<template>
    <div class="flex px-5 py-3 bg-primary-500 text-white rounded-lg flex items-center gap-4">
        <UpdateItem
            v-if="editMode"
            :item="item"
            @updated="editMode = false"
            @cancel="editMode = false"
        />
        <template v-else>
            <button
                @click="toggleCompleted"
                class="w-4 h-4 rounded-full border border-white shrink-0"
                :class="props.item.completed && 'bg-white'"
            />
            <button
                @click="toggleCompleted"
                class="font-bold text-start"
                :class="props.item.completed && 'line-through'">
                {{ item.todo }}
            </button>

            <div class="flex gap-1 items-center ml-auto">
                <template v-if="isDeleting || isUpdating">
                    <Loading3QuartersOutlined
                        class="px-4 flex text-white items-center justify-center text-lg animate-spin" />
                </template>
                <template v-else>
                    <button :class="buttonClass" @click="editMode = true">
                        <EditOutlined />
                    </button>

                    <button @click="onDelete" :class="buttonClass">
                        <DeleteOutlined />
                    </button>
                </template>
            </div>
        </template>
    </div>
</template>