import type { filter } from "../types"

export interface TodoItemI {
  name: string, 
  isCompleted: boolean
}

export type stateT = {
  value: filter
}

export type InitialState = {
  value: TodoItemI[]
}