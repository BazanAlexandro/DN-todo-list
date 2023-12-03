<script setup lang="ts">
import Search from './Search.vue'
import CompletedFilter from './CompletedFilter.vue'
import type { FilterType } from '@/types/Filter';

const props = defineProps<{
    filter: FilterType
    onChange: (filter: FilterType) => void
}>()

function searchChange(val: string) {
    props.onChange({
        completed: props.filter.completed,
        search: val
    })
}

function completedChange(val?: boolean) {
    props.onChange({
        completed: val,
        search: props.filter.search,
    })
}

</script>

<template>
    <div class="flex w-full gap-4">
        <Search :search="filter.search" @change="searchChange" />
        <CompletedFilter :filter="filter.completed" @on-change="completedChange" />
    </div>
</template>