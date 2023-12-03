<script setup lang="ts">
import { CheckCircleFilled, CloseCircleFilled, Loading3QuartersOutlined } from '@ant-design/icons-vue';
import { computed, ref, watch, onMounted } from 'vue';

const btnClass = 'text-primary-500 w-9 h-8 text-xl flex items-center justify-center hover:text-primary-400 disabled:opacity-50 disabled:text-gray-500 disabled:cursor-not-allowed transition'

const props = defineProps<{
    value?: string
    isSubmitting?: boolean
}>()

const emit = defineEmits<{
    change: [string]
    cancel: []
}>()

const text = ref(props.value)
const inputRef = ref<HTMLInputElement>()

watch(() => props.value, () => {
    text.value = props.value
})

onMounted(() => {
    if (inputRef.value) {
        inputRef.value.focus()
    }
})

const canBeSaved = computed(() => text.value && text.value.length > 0)

async function onSubmit() {
    if (!canBeSaved || !text.value) return

    emit('change', text.value)
}
</script>

<template>
    <form @submit.prevent="onSubmit"
        class="h-12 flex items-center bg-white rounded-lg focus-within:outline focus-within:outline-primary-500 w-full pr-1">
        <input type="text" class="w-full text-black text-sm font-medium pl-5 py-3 bg-transparent focus-within:outline-none"
            placeholder="Note ..." v-model="text" ref="inputRef" />

        <Loading3QuartersOutlined v-if="isSubmitting"
            class="px-4 flex text-primary-500 items-center justify-center text-lg animate-spin" />
        <div v-else class="flex">
            <button :disabled="!canBeSaved" :class="btnClass">
                <CheckCircleFilled />
            </button>
            <button type="button" @click="emit('cancel')" :class="btnClass">
                <CloseCircleFilled />
            </button>
        </div>
    </form>
</template>