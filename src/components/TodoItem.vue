<script setup lang="ts">
import type { TodoItemType } from '@/types/Todo';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'

const buttonClass = 'flex items-center p-2 hover:bg-primary-400 rounded transition'

const props = defineProps<{
    item: TodoItemType
}>()

const { item } = props
</script>

<template>
    <div class="flex px-5 py-3 bg-primary-500 text-white rounded-lg flex items-center gap-4">
        <button class="w-4 h-4 rounded-full border border-white shrink-0" />
        <button class="font-bold text-start">{{ item.todo }}</button>

        <div class="flex gap-1 items-center ml-auto">
            <button :class="buttonClass">
                <EditOutlined />
            </button>

            <button :class="buttonClass">
                <DeleteOutlined />
            </button>
        </div>
    </div>
</template>