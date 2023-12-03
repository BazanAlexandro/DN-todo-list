<script setup lang="ts">
import { Loading3QuartersOutlined, PlusOutlined } from '@ant-design/icons-vue'
import NewItem from './NewItem.vue'
import TodoItem from './TodoItem/index.vue'
import FilterPanel from './FilterPanel/index.vue'
import { useFetchTodos } from '@/utils/queries/todos/useFetch';
import { computed, ref } from 'vue';
import { createToast } from '@/utils/toast';
import { usePersistState } from '@/utils/persistance'
import type { FilterType } from '@/types/Filter';
import { filterTodos } from '@/utils/filter'

const createMode = ref(false)

const filter = ref<FilterType>({})
const { data, isLoading } = useFetchTodos()

usePersistState(data)

const filtered = computed(() => filterTodos(data.value, filter.value))

function onCreated() {
    createMode.value = false

    createToast('Todo is created')
}

function onFilterChange(f: FilterType) {
    filter.value = f
}

</script>

<template>
    <div class="flex flex-col max-w-xl mx-auto py-8 gap-4">
        <h2 class="font-bold text-3xl mb-2">
            To Do List
        </h2>

        <div class="flex flex-col sticky top-0 bg-mainBg py-4 gap-4">
            <FilterPanel :filter="filter" @change="onFilterChange" />

            <button :disabled="createMode" class="font-bold text-primary-500 disabled:text-gray-300 disabled:cursor-not-allowed flex gap-2 items-center justify-end"
                @click="createMode = true">
                Add task
                <PlusOutlined />
            </button>
        </div>

        <div class="flex flex-col gap-2">
            <div v-if="isLoading" class="py-8 flex justify-center">
                <Loading3QuartersOutlined class="w-9 flex items-center justify-center text-3xl animate-spin" />
            </div>

            <TodoItem v-else v-for="item in filtered" :item="item" :key="item.id" />

            <NewItem
                v-if="createMode"
                @on-created="onCreated"
                @cancel="createMode = false"
            />
        </div>
    </div>
</template>
