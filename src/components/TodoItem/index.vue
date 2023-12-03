<script setup lang="ts">
import type { TodoItemType } from '@/types/Todo'
import { ref } from 'vue';
import Update from './Update.vue';
import Display from './Display.vue';

const props = defineProps<{
    item: TodoItemType
}>()

const editMode = ref(false)

</script>

<template>
    <div class="flex text-white rounded-lg overflow-hidden flex items-center gap-4">
        <Update
            v-if="editMode"
            :item="props.item"
            @updated="editMode = false"
            @cancel="editMode = false"
        />
        <Display
            v-else
            :item="props.item"
            @edit="editMode = true"
        />
    </div>
</template>