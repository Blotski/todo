import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './redux/store.ts'
import {update} from './redux/slice/FilterReducer.ts'
import { addItem, removeItem } from './redux/slice/todoItemsSlice.ts';

// todo main  - > todo filtration + todo crud 
// todo auth 

interface AuthProps {
  loggedIn: boolean,
  setLoggedIn: (a: boolean) => void,
}

interface TodoProps {
  todo: TodoItem,
  i: number,
  handleDeleteToDoItem: (i: number) => void,
  handleEdit: (i: number) => void,
  handleComplete?: (i: number) => void,
  filter: filter,
}

export type TodoItem = string;
export type filter = 'all' | 'completed' | 'active';

type TodoT = (p: TodoProps) => React.ReactElement;
type AboutPageT = (p: AuthProps) => React.ReactElement;
type TasksT = () => React.ReactElement;
type AppReduxByComponentT = () => React.ReactElement

const passwordInDb = 'a';
const emailInDb = 'a';

const AppReduxByComponent: AppReduxByComponentT = () => { 
  const [ loggedIn, setLoggedIn ] = useState(true);

  return (
    <>
      <AuthPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      { loggedIn && <Tasks /> }
    </>
  )
}

const AuthPage: AboutPageT = ({loggedIn, setLoggedIn}: AuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log('Login data submitted' + email + password);
    if (email === emailInDb && password === passwordInDb) {
      setLoggedIn(true);
    }
  }

  const handleSignout = () => {
    setLoggedIn(false);
  }

  return (
    <div>

    <div className='auth'>
      {!loggedIn && <button>Login</button>}
      {!loggedIn && <button>Sign up</button>}
      {loggedIn && <button onClick={handleSignout}>Sign out</button>}
    </div>
    {
      !loggedIn &&
      <div className='login-form'>
        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
        <label htmlFor="email">Email</label>
        <input onChange={(e) => setPassword(e.target.value)}  type="password" id="password" />
        <label htmlFor="password">Password</label>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    }
    </div>
  )
}

const Tasks: TasksT = () => {
  const [ newItem, setNewItem ] = useState<TodoItem >('');

  const dispatch = useDispatch();
  const todoItmesR = useSelector((state: RootState ) => state.todoItems.value)
  const filter = useSelector((state: RootState) => state.filter.value)

  const handleAddToDoItem = (): void => {
    if (!newItem) return;
    dispatch(addItem(newItem))
    setNewItem('');
  }

  const handleDeleteToDoItem = (i: number): void => {
    dispatch(removeItem(i))
    setNewItem('');
  }

  const handleEdit = (itemIndex: number): void => {
    setNewItem(todoItmesR[itemIndex]);
    dispatch(removeItem(itemIndex))
  }

  return (
    <div>
        <div>
          <h1>TODO AppReduxByComponent</h1>
        </div>
        <div className='form'>
          <div className='controls'>
          </div>
        <div className='tasks'>

          <div className="filter">
            <button className="show-completed" onClick={() => dispatch(update('completed'))}>Show completed</button>
            <button className="show-active" onClick={() => dispatch(update('active'))}>Show active</button>
            <button className="show-all" onClick={() => dispatch(update('all'))}>Show all</button>
          </div>
          <hr />
        <div className='add-task'>
          <label htmlFor="new-task">
            Enter task name:
            <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
          </label>
          <button onClick={handleAddToDoItem}> Add</button> 

        </div>
        <hr />

          {
            todoItmesR.map((item, index) =>  {
              console.log('item- ', item)
            return <Todo
            key={index + item}
            todo={item} 
            i={index} 
            handleDeleteToDoItem={handleDeleteToDoItem}
            handleEdit={handleEdit}
            filter={filter}
            />})
          }

        </div>

        </div>
      </div>
  )
}

const Todo: TodoT = ({todo, i, handleDeleteToDoItem, handleEdit, filter}: TodoProps) => {
  const [ isCompleted, setIsCompleted ] = useState(false)


  if (filter === 'all') {
    console.log('filter === all')
  } else if ( filter === 'completed' && !isCompleted  ||   filter === 'active' && isCompleted  ) {
    return <></>
  }

  return (
    <div className='item' >
            <p>{todo + ' index is ' + i}</p>
            <input type="checkbox" checked={isCompleted} onChange={() => setIsCompleted(isCompleted ? false : true)}/>
          {' '}
      <button onClick={() => handleDeleteToDoItem(i )}>Delete</button>
      {' '}
      <button onClick={() => handleEdit(i)}>Edit</button>
    </div>

  )
}

export default AppReduxByComponent
