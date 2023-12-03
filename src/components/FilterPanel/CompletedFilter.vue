<script setup lang="ts">
const props = defineProps<{
    filter?: boolean
}>()

const emit = defineEmits<{
    onChange: [boolean | undefined]
}>()

function onChange(e: Event) {
    const serialized = (e.target as HTMLSelectElement).value
    const value: (boolean | undefined) = serialized ? JSON.parse(serialized) : undefined

    emit('onChange', value)
}

</script>

<template>
    <select
        class="rounded-lg px-4 focus:outline-primary-500 text-gray-400 bg-gray-50 appearance-none text-sm"
        :value="props.filter"
        @change="onChange"
    >
        <option value="">All</option>
        <option value="true">Completed</option>
        <option value="false">Non-completed</option>
    </select>
</template>