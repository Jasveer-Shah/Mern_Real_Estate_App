import {FaSearch} from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaHouseUser } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
 const { currentUser } = useSelector(state => state.user);
 const [searchTerm, setSearchTerm] = useState('')
   // console.log(currentUser);
console.log(searchTerm);
   const handleSubmit = (e)=>{
         e.preventDefault();
         const urlParams = new URLSearchParams(window.location.search);
         urlParams.set('searchTerm', searchTerm);
         const searchQuery = urlParams.toString();
         navigate(`/search?${searchQuery}`);
   }

useEffect(()=>{
       const urlParams = new URLSearchParams(location.search);
       const searchTermFromUrl = urlParams.get('searchTerm');
       if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl);
       }
}, [location.search]);

  return (
    <header className='bg-slate-700 shadow-md p-5'>
        <div className='flex justify-between item-center max-w-6xl mx-auto px-0 sm:p-3'>
        <Link to="/">
        <h1 className='flex text-sm  sm:text-3xl tracking-wide gap-2  flex-wrap hover:scale-110 duration-300'>
            <FaHouseUser className="text-4xl text-white mr-1"/>
            <p className="flex flex-col sm:flex-row">
            <span className='text-slate-100'>Dream  </span>
            <span className='text-slate-100 sm:ml-2'>Estate</span>
            </p>
        </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-100 h-2/4 p-2 sm:p-3 rounded-lg flex self-center  sm:items-center'>
            <input type='text' placeholder='Search...' className=' bg-transparent focus:outline-none w-24 sm:w-64' 
                   value={searchTerm}
                   onChange={(e)=> setSearchTerm(e.target.value)}
              />
            <button>
            <FaSearch className="text-slate-600"/>
           </button>
        </form>
        <ul className="flex gap-2 sm:gap-8 self-center">
          <Link to='/'> <li className="hidden sm:inline text-white  sm:text-xl hover:underline">Home</li></Link> 
          <Link to='about'> <li className="hidden sm:inline text-white  sm:text-xl hover:underline">About</li></Link> 
          
           <Link to='profile'> 
             { currentUser ? (
                <img  src={currentUser.avatar} alt="profile" className="rounded-full h-7 w-7 object-cover"/>
             ) : (
              <li className="text-sm sm:text-xl self-center text-white hover:underline">Sign in</li>
             )
            }
         </Link>
          
        </ul>
        </div>
    </header>
  )
}
