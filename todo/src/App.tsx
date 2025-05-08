// import { useState } from 'react'

import { useState } from 'react'
import './App.css'

// todo main  - > todo filtration + todo crud 
// todo auth 

const passwordInDb = 'xyz';
const emailInDb = 'a@g.com';

type Props = {
  todo: TodoItem,
  i: number,
  handleDeleteToDoItem: (i: number) => void,
  handleEdit: (i: number) => void,
  handleComplete: (i: number) => void,
  
}

type TodoItem = {
  name: string,
  completed: boolean
}

type filter = 'all' | 'completed' | 'active';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ loggedIn, setLoggedIn ] = useState(true);
  const [ newItem, setNewItem ] = useState<TodoItem >({name: '', completed: false});
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
    setTodoItems([...todoItems, newItem ])
    setNewItem({name: '', completed: false});
  }
  const handleDeleteToDoItem = (i: number): void => {
    setTodoItems([...todoItems.slice(0, i), ...todoItems.slice(i+1)])
    setNewItem({name: '', completed: false});
  }

  const handleEdit = (itemIndex: number) => {
    setNewItem(todoItems[itemIndex]);
    setTodoItems([...todoItems.slice(0, itemIndex), ...todoItems.slice(itemIndex+1)])
  }

  const handleComplete = (itemIndex: number): void => {
    const currItem = todoItems[itemIndex];
    currItem.completed = currItem.completed ? false : true;
    setTodoItems([...todoItems.slice(0, itemIndex), currItem, ...todoItems.slice(itemIndex+1)])
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
            {/* <button onClick={handleAddToDoItem}> Add</button>  */}
            {/* <button>Delete</button> */}
            {/* <button>Edit</button> */}
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
            <input type="text" value={newItem?.name} onChange={(e) => setNewItem({name: e.target.value, completed: false})}/>
          </label>
          <button onClick={handleAddToDoItem}> Add</button> 
          {/* <button >Submit</button> */}
        </div>
        <hr />
          {/* <TodoItem /> */}

          {
            todoItems.filter(item => {
              if (filter === 'all') return item;
              if (filter === 'completed' && item.completed === true) return item;
              if (filter === 'active' && item.completed !== true) return item;
            } ).map((item: TodoItem, i: number) =>  <Todo
            todo={item} 
            i={i} 
            handleDeleteToDoItem={handleDeleteToDoItem}
            handleEdit={handleEdit}
            handleComplete={handleComplete}
            />)

          }

        </div>

        </div>
      </div>
    }
    
    </>
  )
}


const Todo = ({todo, i, handleDeleteToDoItem, handleEdit, handleComplete}: Props) => {
  // const [isChecked, setIsChecked ] = useState(false);
  // const [ completed, setCompleted ] = useState(false);

  console.log(todo)

  return (
    <div key={i + todo.name} className='item' >
      {/* <label htmlFor={todo} onClick={() => setIsChecked(isChecked ? false : true)}>
            <input type="checkbox" id={todo} checked={isChecked}/>
            {todo}
          </label> */}
            <p>{todo.name}</p>
            <input type="checkbox" checked={todo.completed} onClick={() => handleComplete(i)}/>
          {' '}
      <button onClick={() => handleDeleteToDoItem(i )}>Delete</button>
      {' '}
      <button onClick={() => handleEdit(i)}>Edit</button>
    </div>

  )
}

export default App
