<script setup lang="ts">
import { Loading3QuartersOutlined, PlusOutlined } from '@ant-design/icons-vue'
import TodoItem from './TodoItem.vue'
import { useFetchTodos } from '@/utils/queries/useFetchTodos';

const { data, isLoading } = useFetchTodos()
</script>

<template>
    <div class="flex flex-col max-w-xl mx-auto py-8 gap-4">
        <h2 class="font-bold text-3xl">
            To Do List
        </h2>

        <div class="flex justify-end">
            <button class="font-bold text-primary-500 flex gap-2 items-center">
                Add task
                <PlusOutlined />
            </button>
        </div>

        <div class="flex flex-col gap-2">
            <div v-if="isLoading" class="py-8 flex justify-center">
                <Loading3QuartersOutlined class="w-9 flex items-center justify-center text-3xl animate-spin" />
            </div>
            <TodoItem
                v-else
                v-for="item in data?.todos"
                :item="item"
                :key="item.id"
            />
        </div>
    </div>
</template>
