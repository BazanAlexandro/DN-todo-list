<script setup lang="ts">
import { useCreateTodo } from '@/utils/queries/todos/useCreate'
import ConfirmableInput from './base/ConfirmableInput.vue';

const emit = defineEmits<{
    onCreated: []
    cancel: []
}>()

const { mutateAsync: create, isPending: isSubmitting } = useCreateTodo()

async function onCreate(value: string) {
    await create({
        todo: value
    })

    emit('onCreated')
}

</script>

<template>
    <ConfirmableInput
        value=""
        :is-submitting="isSubmitting"
        @change="onCreate"
        @cancel="emit('cancel')"
    />
</template>