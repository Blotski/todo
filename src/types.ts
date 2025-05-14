
export interface AuthProps {
  loggedIn: boolean,
  setLoggedIn: (a: boolean) => void,
}

export interface TodoProps {
  todo: TodoItemI,
  i: number,
  handleDeleteToDoItem: (i: number) => void,
  handleEdit: (i: number) => void,
  handleComplete?: (i: number) => void,
  filter: filter,
}

export interface jsonPlaceholderI {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface InitialStateI {
  value: null | jsonPlaceholderI[],
  status: null | 'pending' | 'fullfiled' | 'rejected'
}

export type filter = 'all' | 'completed' | 'active' | null;


export type TodoT = (p: TodoProps) => React.ReactElement | null; 
export type AboutPageT = (p: AuthProps) => React.ReactElement; 
export type GenericReact = () => React.ReactElement;

export interface TodoItemI {
  name: string, 
  isCompleted: boolean
}

export interface stateI {
  value: filter
}

export interface InitialState {
  value: TodoItemI[]
}
