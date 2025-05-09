// re-render only individual items

import { useState } from 'react'
import './App.css'

// todo main  - > todo filtration + todo crud 
// todo auth 

type Props = {
  todo: TodoItem,
  i: number,
  handleDeleteToDoItem: (i: number) => void,
  handleEdit: (i: number) => void,
  handleComplete?: (i: number) => void,
  filter: filter,
}

type TodoItem = string;

type filter = 'all' | 'completed' | 'active';

type TodoT = (p: Props) => React.ReactElement;

const passwordInDb = 'x';
const emailInDb = 'a@g';


function App1(): React.ReactElement { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ loggedIn, setLoggedIn ] = useState(true);
  const [ newItem, setNewItem ] = useState<TodoItem >('');
  const [ todoItems, setTodoItems ] = useState<TodoItem[]>([])
  const [ filter, setFilter ] = useState<filter>('all')

  const handleSubmit = () => {
    console.log('Login data submitted' + email + password);
    if (email === emailInDb && password === passwordInDb) {
      setLoggedIn(true);
    }
  }

  const handleSignout = () => {
    setLoggedIn(false);
  }

  const handleAddToDoItem = (): void => {
    if (!newItem) return;
    // newItem.index = todoItems.length;
    setTodoItems([...todoItems, newItem ])
    setNewItem('');
  }
  const handleDeleteToDoItem = (i: number): void => {
    setTodoItems([...todoItems.slice(0, i), ...todoItems.slice(i+1)])
    setNewItem('');
  }

  const handleEdit = (itemIndex: number): void => {
    setNewItem(todoItems[itemIndex]);
    setTodoItems([...todoItems.slice(0, itemIndex), ...todoItems.slice(itemIndex+1)])
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
          <h1>TODO APP1</h1>
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
            <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
          </label>
          <button onClick={handleAddToDoItem}> Add</button> 

        </div>
        <hr />

          {
            todoItems.map((item, index) =>  {
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
    }
    
    </>
  )
}




const Todo: TodoT = ({todo, i, handleDeleteToDoItem, handleEdit, filter}: Props) => {
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

export default App1
