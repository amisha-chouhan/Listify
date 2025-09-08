import { useState,useEffect } from 'react';
import Navbar from './components/Navbar'
import './index.css'
 import {v4 as uuid4} from 'uuid';

 function App() {

  const [todo,setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [theme,setTheme] = useState("light");

 
   useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };


  const handleAdd = () => {
    setTodos( [...todos,{ id: uuid4(),  todo, isCompleted:false}])
    setTodo("")
    console.log(todos)
  }

  const handleEdit = (e,id) =>{
    let t=todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
  }
  const handleDelete = (e, id) => {
    // let index =todos.findIndex(item => {
    //   return item.id===id
    // })
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
  }

   const handleChange= (e)=>{
      setTodo(e.target.value)
  }
  

  const handleCheckbox=(e)=>{
    let id = e.target.name
    let index =todos.findIndex(item => {
      return item.id===id
    })
    let newTodos = [...todos] ;
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  
  }
  return (
    < >
    <div className='bg-violet-100 dark:bg-blue-300 min-h-max '>
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      
      <div className="container mx-auto max-w-2xl my-10 rounded-xl p-6  bg-blue-300 dark:bg-indigo-800 shadow-lg min-h-[80vh] transition-colors duration-300">

        
        <h1 className="text-2xl font-bold text-violet-900 dark:text-violet-100  mb-4 text-center">
          Add a Todo
        </h1>
        <div className="addTodo flex flex-col sm:flex-row items-center gap-3 mb-6">
          <input
            onChange={handleChange} value={todo}
            type="text"
            placeholder="Write your todo..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button onClick={handleAdd} className="bg-violet-700 hover:bg-violet-800 px-4 py-2 text-sm font-semibold text-white rounded-md transition-all duration-200 w-full sm:w-auto">
            Save
          </button>
        </div>

        
        <h2 className="text-xl font-semibold text-gray-700 mb-3 dark:text-white ">Your Todos</h2>
        <div className="todos space-y-3">
          {todos.length===0 && <p className='text-gray-500 dark:text-white'>no todos available please add some todos</p>}
            {todos.map(item => {

                 
         return  <div key={item.id} className="todo flex justify-between items-center bg-white dark:bg-white shadow-md rounded-md p-3">
            <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted}  id='' />
            <div className= '{item.isCompleted?"": "line-through"} text-gray-800 dark:black'>{item.todo}</div>
            <div className="flex gap-2">
              <button onClick={(e)=>handleEdit(e,item.id)} className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 text-sm font-medium text-white rounded-md transition-all duration-200">
                Edit
              </button>
              <button  onClick={(e)=>handleDelete(e,item.id)} className="bg-red-500 hover:bg-red-600 px-3 py-1 text-sm font-medium text-white rounded-md transition-all duration-200">
                Delete
              </button>
            </div>
          </div>
            })}
        </div>  
      </div>
    </div>
    </>
  )
}

export default App;