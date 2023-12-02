<script setup lang="ts">
    import { PlusOutlined } from '@ant-design/icons-vue'
    import Note from './Note.vue'
</script>

<template>
    <div class="flex flex-col max-w-xl mx-auto py-8 gap-4">
        <h2 class="font-bold text-3xl">
            To Do List
        </h2>

        <div class="flex justify-end">
            <button class="font-bold text-primary-500 flex gap-2 items-center">
                Add task <PlusOutlined />
            </button>
        </div>

        <div class="flex flex-col gap-2">
            <Note />
        </div>
    </div>
</template>
