export type TodoCreationPayloadType = {
    todo: string
}

export type TodoUpdatePayloadType = {
    todo?: string
    completed?: boolean
}

export type TodoItemType = {
    id: string
    completed: boolean
} & TodoCreationPayloadType