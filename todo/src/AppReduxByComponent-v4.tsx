import './App.css'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {update} from './redux/slice/FilterReducer.ts'
import { addItem, removeItem } from './redux/slice/todoItemsSlice.ts';

import type { AuthProps, TodoProps, TodoT, AboutPageT, GenericReact } from './types.ts';
import type { RootState, AppDispatch } from './redux/store.ts';

const passwordInDb = 'a';
const emailInDb = 'a';


const AppReduxByComponent: GenericReact = () => { 
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


const Tasks: GenericReact = () => {
  const [ newItem, setNewItem ] = useState('');

  const dispatch: AppDispatch = useDispatch();
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
  )
}

const Todo: TodoT = ({todo, i, handleDeleteToDoItem, handleEdit, filter}: TodoProps) => {
  const [ isCompleted, setIsCompleted ] = useState(false)

  if (filter === 'all') {
    // console.log('filter === all')
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
