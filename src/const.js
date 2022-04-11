import {v4 as uuidv4} from "uuid";

export const MAX_PRIORITY = 10
export const MIN_PRIORITY = 1
export const BASE_URL = 'https://pasv-kanban.herokuapp.com'
export const initialStatuses = [
    {
        id: uuidv4(),
        status: 'todo'
    },
    {
        id: uuidv4(),
        status: 'progress'
    },
    {
        id: uuidv4(),
        status: 'review'
    },
    {
        id: uuidv4(),
        status: 'done'
    },
]