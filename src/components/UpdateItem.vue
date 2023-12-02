<script setup lang="ts">
import type { TodoItemType } from '@/types/Todo';
import { useUpdateTodo } from '@/utils/queries/todos/useUpdate';
import { CheckCircleFilled, CloseCircleFilled, Loading3QuartersOutlined } from '@ant-design/icons-vue';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
    item: TodoItemType
}>()

const emit = defineEmits<{
    updated: []
    cancel: []
}>()

const { item: itemProp } = props
const item = ref(itemProp)
const { todo, completed } = item.value

const { mutateAsync: updateTodo, isPending: isUpdating } = useUpdateTodo(itemProp.id)

watch(itemProp, () => {
    item.value = itemProp
})

const canBeSaved = computed(() => todo.length > 0)

async function onUpdate() {
    await updateTodo({
        completed: item.value.completed,
        todo: item.value.todo
    })

    emit('updated')
}
</script>

<template>
    <form @submit.prevent="onUpdate"
        class="flex items-center gap-4 bg-white rounded-lg focus-within:outline focus-within:outline-primary-500 w-full">
        <input type="text" class="w-full text-black font-medium px-5 py-3 bg-transparent focus-within:outline-none"
            placeholder="New note ..." v-model="todo" ref="inputRef" />

        <Loading3QuartersOutlined v-if="isUpdating"
            class="px-4 flex text-primary-500 items-center justify-center text-lg animate-spin" />
        <div v-else class="flex">
            <button :disabled="!canBeSaved"
                class="text-primary-500 px-3 text-xl flex items-center py-4 disabled:opacity-50 disabled:text-gray-500 disabled:cursor-not-allowed transition">
                <CheckCircleFilled />
            </button>
            <button
                type="button"
                @click="emit('cancel')"
                class="text-primary-500 px-3 text-xl flex items-center py-4 disabled:opacity-50 disabled:text-gray-500 disabled:cursor-not-allowed transition">
                <CloseCircleFilled />
            </button>
        </div>
    </form>
</template>