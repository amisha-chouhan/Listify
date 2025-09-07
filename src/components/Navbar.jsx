import React, { useState } from 'react'
const Navbar = ({toggleTheme,theme}) =>{
     const [isOpen, setIsOpen] = useState(false);
    return(

    <div>

        <nav className='flex justify-between bg-indigo-800 text-white py-3 items-center px-4 '>
            <div className="logo">
                <span className='font-bold text-x1  '>Listify</span>
            </div>
             
            <div className='flex items-center gap-4'>
                <button
                     className="sm:hidden focus:outline-none"
                     onClick={() => setIsOpen(!isOpen)}
                 >
                   <div className="space-y-1">
                     <span className="block w-6 h-0.5 bg-white"></span>
                     <span className="block w-6 h-0.5 bg-white"></span>
                     <span className="block w-6 h-0.5 bg-white"></span>
                   </div>
                </button>
                
            <ul className='hidden sm:flex gap-6 font-medium '>
                <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all '>Your Tasks</li>
            </ul>
            <button
             onClick={toggleTheme}
             className="px-3 py-1 rounded-md text-sm font-medium  mx-8
                  bg-violet-700 text-white hover:bg-violet-800 dark:bg-violet-600 dark:hover:bg-violet-500"
      >
             {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
            </button>
            </div>

             {isOpen && (
                 <div className="absolute top-14 right-6 bg-indigo-700 rounded-md shadow-lg sm:hidden">
                     <ul className="flex flex-col items-start p-4 space-y-2">
                       <li className="cursor-pointer hover:font-bold transition-all">
                          Home
                       </li>
                        <li className="cursor-pointer hover:font-bold transition-all">
                       Your Tasks
                        </li>
                     </ul>
                 </div>
             )}
        </nav>
        
    </div>
    )
}

export default Navbar 