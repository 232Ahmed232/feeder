import React ,{useEffect,useState} from 'react';
import { NavLink,Link } from "react-router-dom";
import logo from "./log.png"
import { app } from '../../firebase';
import { getAuth,signOut,onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"

const auth = getAuth(app)

function Header(props) {
    
    return (
        <div>
            <ul className='flex flex-col lg:flex-row m-5 w-500 items-center justify-center shadow-md'>
                <img src={logo} alt="logo" className='basis-1/6 h-20 w-0 rounded-full t' height={10} />
                <ul className='flex flex-row basis-2/4   content-center justify-center'>
                        <li className='basis-1/4 m-auto p-10 text-center hover:bg-blue-400 hover:text-white font-black'>
                    <NavLink to="home"

                        className={({ isActive }) => {
                            return ` ${isActive ? "text-blue-800 underline" : " "}`
                        }}
                    >

                            Home
                    </NavLink>
                    
                    </li >
                    

                    <li className='basis-1/4 m-auto p-10 text-center hover:bg-blue-400 hover:text-white font-black' >
                        <NavLink to="about"
                        className={({ isActive }) => {
                            return ` ${isActive ? "text-blue-800 underline" : " "}`
                        }}

                        >
                            About
                        </NavLink>
                    </li>
                    <li className='basis-1/4 m-auto p-10 text-center hover:bg-blue-400 hover:text-white font-black'>
                        <NavLink to="/contact"
                        className={({ isActive }) => {
                            console.log("active");
                            return ` ${isActive ? "text-blue-800 underline" : " "}`
                        }}
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>

                <div className='basis-1/4 flex flex-row m-auto'>
                    <button 
                    onClick={()=>{signOut(auth)}}
                    className='basis-1/2 m-2 p-4 bg-pink-700 text-white font-extrabold rounded-lg hover:bg-white hover:border-pink-700 hover:border-2 hover:text-black'>
                        <Link 
                        >
                        Sign Out
                        </Link>
                        </button>
                    <button 
                    className='basis-1/2 m-2 p-4 border-pink-700 border-2 rounded-lg font-extrabold hover:bg-pink-700 hover:border-none hover:text-white'>
                       <i className="fa fa-user mr-3" aria-hidden="true"></i>
                        {props.name}
                        
                        </button>
                </div>
            </ul>
        </div>
    );
}

export default Header;