<script setup lang="ts">
import { CheckCircleFilled, Loading3QuartersOutlined } from '@ant-design/icons-vue';
import { computed, onMounted, ref } from 'vue';
import { useCreateTodo } from '@/utils/queries/todos/useCreate'

const emit = defineEmits<{
    onCreated: []
}>()

const text = ref('')
const inputRef = ref<HTMLInputElement>()
const { mutateAsync, isPending: isSubmitting } = useCreateTodo()

const canBeSaved = computed(() => text.value.length > 0)

onMounted(() => {
    if (inputRef.value) {
        inputRef.value.focus()
    }
})

async function onSubmit() {
    if (!canBeSaved) return

    await mutateAsync({
        todo: text.value
    })

    emit('onCreated')
}

</script>

<template>
    <form
        @submit.prevent="onSubmit"
        class="flex items-center gap-4 bg-white rounded-lg focus-within:outline focus-within:outline-primary-500"
    >
        <input
            type="text" class="w-full text-sm font-medium px-5 py-3 bg-transparent focus-within:outline-none"
            placeholder="New note ..."
            v-model="text"
            ref="inputRef"
        />

        <Loading3QuartersOutlined
            v-if="isSubmitting"
            class="px-4 flex text-primary-500 items-center justify-center text-lg animate-spin"
        />
        <button
            v-else
            :disabled="!canBeSaved"
            class="text-primary-500 px-4 text-xl flex items-center py-4 disabled:opacity-50 disabled:text-gray-500 disabled:cursor-not-allowed transition">
            <CheckCircleFilled />
        </button>
    </form>
</template>