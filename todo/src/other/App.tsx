// doesn't handle delete
// re-render todo list with any change

import { useState } from 'react'
import './App.css'

// todo main  - > todo filtration + todo crud 
// todo auth 

const passwordInDb = 'x';
const emailInDb = 'a@g';

type Props = {
  todo: TodoItem,
  i: number,
  handleDeleteToDoItem: (i: number) => void,
  handleEdit: (i: number) => void,
  handleComplete: (i: number) => void,
  
}

type TodoItem = {
  name: string,
  completed: boolean,
  index: number
}

type filter = 'all' | 'completed' | 'active';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ loggedIn, setLoggedIn ] = useState(true);
  const [ newItem, setNewItem ] = useState<TodoItem >({name: '', completed: false, index: -1});
  const [ todoItems, setTodoItems ] = useState<TodoItem[]>([])
  const [ filter, setFilter ] = useState<filter>('all')


  // console.log('email + pass- ' + email + ' ' + password);
  const handleSubmit = () => {
    console.log('Login data submitted' + email + password);
    if (email === emailInDb && password === passwordInDb) {
      setLoggedIn(true);
    }
  }

  const handleSignout = () => {
    setLoggedIn(false);
  }

  const handleAddToDoItem = () => {
    if (!newItem.name) return;
    newItem.index = todoItems.length;
    setTodoItems([...todoItems, newItem ])
    setNewItem({name: '', completed: false, index: -1});
  }
  const handleDeleteToDoItem = (i: number): void => {
    setTodoItems([...todoItems.slice(0, i), ...todoItems.slice(i+1)])
    setNewItem({name: '', completed: false, index: -1});
  }

  const handleEdit = (itemIndex: number) => {
    setNewItem(todoItems[itemIndex]);
    setTodoItems([...todoItems.slice(0, itemIndex), ...todoItems.slice(itemIndex+1)])
  }

  const handleComplete = (itemIndex: number): void => {
    const currItem = todoItems[itemIndex];
    console.log('index- ', itemIndex, 'item object- ', todoItems[itemIndex])
    currItem.completed = currItem.completed ? false : true;
    setTodoItems([...todoItems.slice(0, itemIndex), currItem, ...todoItems.slice(itemIndex+1)])
    console.log('index- ', itemIndex, 'item object- ', todoItems[itemIndex])
  }

  return (
    <>
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

    {
      loggedIn &&
      <div>
        <div>
          <h1>TODO APP</h1>
        </div>
        <div className='form'>
          <div className='controls'>
          </div>
        <div className='tasks'>

          <div className="filter">
            <button className="show-completed" onClick={() => setFilter('completed')}>Show completed</button>
            <button className="show-active" onClick={() => setFilter('active')}>Show active</button>
            <button className="show-all" onClick={() => setFilter('all')}>Show all</button>
          </div>
          <hr />
        <div className='add-task'>
          <label htmlFor="new-task">
            Enter task name:
            <input type="text" value={newItem?.name} onChange={(e) => setNewItem({name: e.target.value, completed: false, index: -1})}/>
          </label>
          <button onClick={handleAddToDoItem}> Add</button> 
          {/* <button >Submit</button> */}
        </div>
        <hr />
          {/* <TodoItem /> */}

          {
            todoItems.filter((item, i) => {
              if (filter === 'all') return [item, i];
              if (filter === 'completed' && item.completed === true) return [item, i];
              if (filter === 'active' && item.completed !== true) return [item, i];
            } ).map((item) =>  {
              console.log('item- ', item)
            return <Todo
            key={item.index + item.name}
            todo={item} 
            i={item.index} 
            handleDeleteToDoItem={handleDeleteToDoItem}
            handleEdit={handleEdit}
            handleComplete={handleComplete}
            />})

          }

        </div>

        </div>
      </div>
    }
    
    </>
  )
}


const Todo = ({todo, i, handleDeleteToDoItem, handleEdit, handleComplete}: Props) => {

  console.log(todo)

  return (
    <div className='item' >
            <p>{todo.name + ' index is ' + i}</p>
            <input type="checkbox" checked={todo.completed} onChange={() => handleComplete(i)}/>
          {' '}
      <button onClick={() => handleDeleteToDoItem(i )}>Delete</button>
      {' '}
      <button onClick={() => handleEdit(i)}>Edit</button>
    </div>

  )
}

export default App
