<script setup lang="ts">
import { CheckCircleFilled } from '@ant-design/icons-vue';
import { computed, ref } from 'vue';

const text = ref('')
const canBeSaved = computed(() => text.value.length > 0)

</script>

<template>
    <form @submit.prevent class="flex items-center gap-4 bg-white rounded-lg focus-within:outline focus-within:outline-primary-500">
        <input
            type="text" class="w-full font-medium px-5 py-3 bg-transparent focus-within:outline-none"
            placeholder="New note ..."
            v-model="text"
        />

        <button
            :disabled="!canBeSaved"
            class="text-primary-500 px-4 text-xl flex items-center py-4 disabled:opacity-50 disabled:text-gray-500 disabled:cursor-not-allowed transition">
            <CheckCircleFilled />
        </button>
    </form>
</template>