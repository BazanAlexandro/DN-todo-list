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

const { item } = props
const todo = ref(item.todo)

const { mutateAsync: updateTodo, isPending: isUpdating } = useUpdateTodo(item.id)

watch(item, () => {
    todo.value = item.todo
})

const canBeSaved = computed(() => todo.value.length > 0)

async function onUpdate() {
    await updateTodo({
        todo: todo.value
    })

    emit('updated')
}

const btnClass = 'text-primary-500 w-9 h-8 text-xl flex items-center justify-center hover:text-primary-400 disabled:opacity-50 disabled:text-gray-500 disabled:cursor-not-allowed transition'
</script>

<template>
    <form @submit.prevent="onUpdate"
        class="h-12 flex items-center bg-white rounded-lg focus-within:outline focus-within:outline-primary-500 w-full pr-1">
        <input type="text" class="w-full text-black text-sm font-medium pl-5 py-3 bg-transparent focus-within:outline-none"
            placeholder="New note ..." v-model="todo" ref="inputRef" />

        <Loading3QuartersOutlined v-if="isUpdating"
            class="px-4 flex text-primary-500 items-center justify-center text-lg animate-spin" />
        <div v-else class="flex">
            <button :disabled="!canBeSaved"
                :class="btnClass">
                <CheckCircleFilled />
            </button>
            <button
                type="button"
                @click="emit('cancel')"
                :class="btnClass">
                <CloseCircleFilled />
            </button>
        </div>
    </form>
</template>