<script setup lang="ts">
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue'

const buttonClass = 'flex items-center p-2 hover:bg-primary-400 rounded transition'
</script>

<template>
    <div class="flex px-5 py-3 bg-primary-500 text-white rounded-lg flex items-center gap-4">
        <button class="w-4 h-4 rounded-full border border-white" />
        <span class="font-bold">Buy groceries</span>

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