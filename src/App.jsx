import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import './index.css'

function App() {

  return (
    <>
     <Navbar/>
     <div className="container mx-auto">
      <div className='bg-red-600'>
        <h1 >your Todos</h1>
      </div>
     </div>

     <h1 className="text-3xl font-bold text-red-500">Hello Tailwind!</h1>

    </>
    
  )
}

export default App
