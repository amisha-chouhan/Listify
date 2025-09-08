import { useState,useEffect } from 'react';
import Navbar from './components/Navbar'
import './index.css'
 import {v4 as uuid4} from 'uuid';

 function App() {

  const [todo,setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [theme,setTheme] = useState("light");
  const [showFinished, setshowFinished] = useState(true)

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

 const saveToLS = () =>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }


   const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }


  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
         let todos =JSON.parse(localStorage.getItem("todos"))
         setTodos(todos)
       }
  },[] )
  const handleAdd = () => {
    setTodos( [...todos,{ id: uuid4(),  todo, isCompleted:false}])
    setTodo("")
    saveToLS()
  }

  const handleEdit = (e,id) =>{
    let t=todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    // let index =todos.findIndex(item => {
    //   return item.id===id
    // })
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS()
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
    saveToLS()
  
  }
  return (
    < >
    <div className='bg-blue-300 dark:bg-violet-100 min-h-[80vh] mx-3 p-5 my-5 '>
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      
      <div className="container md:mx-auto max-w-2xl my-10 rounded-xl p-6 bg-indigo-800  dark:bg-blue-300 shadow-lg min-h-[80vh] transition-colors duration-300  ">

        
        <h1 className="text-2xl font-bold text-violet-100 dark:text-violet-900  mb-4 text-center">
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

        
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2' htmlFor="show">Show Finished</label> 
         <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className="text-xl font-semibold text-white mb-3 dark:text-gray-700 ">Your Todos</h2>
        <div className="todos space-y-3">
          {todos.length===0 && <p className='text-white dark:text-gray-500'>no todos available please add some todos</p>}
            {todos.map(item => {

                 
         return (showFinished  || !item.isCompleted) && <div key={item.id} className={"todo flex justify-between items-center bg-gray-200 dark:bg-white shadow-md rounded-md p-2 "}>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted}  />
            <div className= '{item.isCompleted?"": "line-through"} text-gray-800 dark:black'>{item.todo}</div>
            <div className="flex gap-2">
              <button onClick={(e)=>handleEdit(e,item.id)} className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 text-sm font-medium text-white rounded-md transition-all duration-200">
                Edit
              </button>
              <button  onClick={(e)=>handleDelete(e,item.id)} className="bg-red-500 hover:bg-red-60 px-3 py-1 text-sm font-medium text-white rounded-md transition-all duration-200">
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