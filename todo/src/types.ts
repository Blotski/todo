export interface AuthProps {
  loggedIn: boolean,
  setLoggedIn: (a: boolean) => void,
}

export interface TodoProps {
  todo: string,
  i: number,
  handleDeleteToDoItem: (i: number) => void,
  handleEdit: (i: number) => void,
  handleComplete?: (i: number) => void,
  filter: filter,
}

export interface jsonPlaceholderI {
  title: string;
}
export interface InitialStateI {
  value: null | [],
  status: null | 'pending' | 'fullfiled' | 'rejected'
}

export type filter = 'all' | 'completed' | 'active';


export type TodoT = (p: TodoProps) => React.ReactElement; 
export type AboutPageT = (p: AuthProps) => React.ReactElement; 
export type GenericReact = () => React.ReactElement;
