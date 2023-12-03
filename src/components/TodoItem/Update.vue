<script setup lang="ts">
import type { TodoItemType } from '@/types/Todo';
import { useUpdateTodo } from '@/utils/queries/todos/useUpdate';
import ConfirmableInput from '../base/ConfirmableInput.vue'

const props = defineProps<{
    item: TodoItemType
}>()

const emit = defineEmits<{
    updated: []
    cancel: []
}>()

const { item } = props

const { mutateAsync: updateTodo, isPending: isUpdating } = useUpdateTodo(item.id)

async function onUpdate(value: string) {
    await updateTodo({
        todo: value
    })

    emit('updated')
}

</script>

<template>
    <ConfirmableInput
        :value="item.todo"
        :is-submitting="isUpdating"
        @change="onUpdate"
        @cancel="emit('cancel')"
        aria-label="Edit Mode"
    />
</template>