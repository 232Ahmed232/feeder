import './App.css'
import Header from './components/Header/Header.jsx'
import { app } from './firebase';
import { getDatabase, ref, get, child } from 'firebase/database';
import { Navigate, Outlet, Router } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"
import { async } from '@firebase/util';
// import Login from "./components/Login/Login"
import React ,{ useContext, useEffect, useState } from 'react';
// import Signup from './components/Signup/Signup';
// import Userprovider from './context/Userprovider'
import useUser from './context/useUser';
import Userprovider from './context/Userprovider';


const auth = getAuth(app);
const dbref = getDatabase(app)
const firestore = getFirestore(app)



function App() { 
  const [fulname,setname]=useState(" ")
  const getdocu = async (em) => {
    const coll = collection(firestore, "users")
    const q = query(coll, where("email", "==", em))
    const snap = await getDocs(q)
    snap.forEach((ele) => {
     setname(ele.data().name)
    })
  }
  const [user, setuse] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuse(user)
        getdocu(user.email)

      } else {
        console.log("You are Loggout");
        setuse(null)
      }
    });

  }, [])

  if (user === null) {

    return (
      <>
      <Navigate to="/"/>
       <Outlet />
      </>
    )
  }
  return (
    <>

      <Navigate to="/home"/>
      <Header name={fulname}/>
      <Outlet />
      </>
  )

}

export default App
