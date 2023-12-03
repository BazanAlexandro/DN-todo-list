<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue';


const props = defineProps<{
    search?: string
    onChange: (val: string) => void
}>()

function onChange(e: Event) {
    const value = (e.target as HTMLInputElement).value
    props.onChange(value)
}

</script>

<template>
    <label class="w-full bg-gray-100 rounded-lg flex items-center text-gray-400 px-4">
        <SearchOutlined />
        <input type="text" class="w-full text-sm font-medium px-2 py-3 bg-transparent focus-within:outline-none"
            placeholder="Search" :value="props.search" @input="onChange" />
    </label>
</template>