<script setup lang="ts">
import type { FilterType } from '@/types/Filter';

const props = defineProps<{
    filter: FilterType
    onChange: (filter: FilterType) => void
}>()

function searchChange(e: Event) {
    props.onChange({
        search: (e.target as HTMLInputElement).value
    })
}

</script>

<template>
    <div class="flex w-full gap-4">
        <input type="text" class="w-full font-medium px-5 py-3 bg-transparent focus-within:outline-none"
            placeholder="New note ..." :value="filter.search" @input="searchChange" />
    </div>
</template>