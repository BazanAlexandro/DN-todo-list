<script setup lang="ts">
import Search from './Search.vue'
import type { FilterType } from '@/types/Filter';

const props = defineProps<{
    filter: FilterType
    onChange: (filter: FilterType) => void
}>()

function searchChange(val: string) {
    props.onChange({
        search: val
    })
}

</script>

<template>
    <div class="flex w-full gap-4">
        <Search :search="filter.search" @change="searchChange" />
    </div>
</template>