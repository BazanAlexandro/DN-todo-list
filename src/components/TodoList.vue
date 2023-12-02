<script setup lang="ts">
import { Loading3QuartersOutlined, PlusOutlined } from '@ant-design/icons-vue'
import NewItem from './NewItem.vue'
import TodoItem from './TodoItem.vue'
import { useFetchTodos } from '@/utils/queries/todos/useFetch';
import { ref } from 'vue';
import { createToast } from '@/utils/toast';

const createMode = ref(false)
const { data, isLoading } = useFetchTodos()

function onCreated() {
    createMode.value = false

    createToast('Todo is created')
}

</script>

<template>
    <div class="flex flex-col max-w-xl mx-auto py-8 gap-4">
        <h2 class="font-bold text-3xl mb-2">
            To Do List
        </h2>

        <div
            v-if="!createMode"
            class="flex justify-end sticky top-0 bg-mainBg py-4"
        >
            <button
                class="font-bold text-primary-500 flex gap-2 items-center"
                @click="createMode = true"
            >
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
                v-for="item in data"
                @deleted="() => onDeleted()"
                :item="item"
                :key="item.id"
            />

            <NewItem v-if="createMode" @on-created="onCreated" />
        </div>
    </div>
</template>
