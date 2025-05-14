import './App.css'

import {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {update} from './redux/slice/FilterSlice.ts'
import { addItem, removeItem, changeComplted } from './redux/slice/todoItemsSlice.ts';
import { fetchJsonPlaceholder, clean } from './redux/slice/jsonPlaceholderSlice.ts';

import type { AuthProps, TodoProps, TodoT, AboutPageT, GenericReact, jsonPlaceholderI, TodoItemI } from './types.ts';
import type { RootState, AppDispatch } from './redux/store.ts';

const passwordInDb = 'a';
const emailInDb = 'a';
const userName = 'user'


const App: GenericReact = () => { 
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

  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.fetchPlaceholder.value)


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
      <div >
        {loggedIn ?
        <>
          <p>Hi, {userName}! 
          {' '}
          <button onClick={handleSignout}>Sign out</button> 
          </p>
        </>
        :
        <>
          <div className='auth'>
            <button>Login</button>
            <button>Sign up</button>
          </div>

          <div className='login-form'>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
            <label htmlFor="email">Email</label>
            <input onChange={(e) => setPassword(e.target.value)}  type="password" id="password" />
            <label htmlFor="password">Password</label>
            <button onClick={handleSubmit}>Submit</button>
            
            <hr/>

            <div>
              <h1>Redux Thunk</h1>
              {
                !data ? 
                  <button onClick={() => dispatch(fetchJsonPlaceholder())}>click to fethc data with asyncThunk</button> 
                  :
                  <>
                    <button onClick={() => dispatch(clean())} >hide</button>
                    {data && data.map((x: jsonPlaceholderI )=> <p key={x.id}>{x.title}</p>) }
                  </>
              }
            </div>
          </div>
        </>
        }
      </div>
    </div>
  )
}


const Tasks: GenericReact = () => {
  const [ newItem, setNewItem ] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const todoItmesR: TodoItemI[] = useSelector((state: RootState ) => state.todoItems.value)
  const filter = useSelector((state: RootState) => state.filter.value)

  const handleAddToDoItem = (): void => {
    if (!newItem) return;
    dispatch(addItem(newItem))
    setNewItem('');
  }

  const handleDeleteToDoItem = (itemIndex: number): void => {
    dispatch(removeItem(itemIndex))
    setNewItem('');
  }

  const handleEdit = (itemIndex: number): void => {
    setNewItem(todoItmesR[itemIndex].name);
    dispatch(removeItem(itemIndex))
  }

  return (
    <div>
        <div>
          <h1>TODO App</h1>
        </div>
          <div className='tasks'>
            <div className="filter">
              {
                ['completed', 'active', 'all'].map(type => 
                <button key={type} className={type === filter ? 'active' : ''} 
                onClick={() => dispatch(update(type))} >
                  Show {type}
                  </button>)
              }
            </div>

            <hr />

            <div className='add-task'>
              <label htmlFor="new-task">
                Enter task name: {' '}
                <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
              </label> {' '}
              <button onClick={handleAddToDoItem}> Add</button> 

            </div>
            <hr />

            {
              todoItmesR.map((item, index) =>  {
              return <Todo
              key={index + item.name}
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
  const dispatch: AppDispatch = useDispatch();

  if ( 
    (filter === 'completed' && !todo.isCompleted)  ||   
    (filter === 'active' && todo.isCompleted)  
  ) {
    return null;
  }
  

  return (
    <div className='item' >
      <p>{todo.name}</p>
      <input type="checkbox" checked={todo.isCompleted} onChange={() => dispatch(changeComplted(i))}/>
      <button onClick={() => handleDeleteToDoItem(i)}>Delete</button>
      <button onClick={() => handleEdit(i)}>Edit</button>
    </div>

  )
}

export default App
