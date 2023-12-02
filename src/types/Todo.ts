export type TodoCreationPayloadType = {
    todo: string
}

export type TodoItemType = {
    id: string
    completed: boolean
} & TodoCreationPayloadType