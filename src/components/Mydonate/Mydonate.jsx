import React, { useContext, useState, useEffect } from 'react';
import { app } from '../../firebase';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDoc, getDocs, addDoc, doc, deleteDoc, } from "firebase/firestore"


const auth = getAuth(app)
const firestore = getFirestore(app)


function Mydonate(props) {

  const [item, setitem] = useState("")
  const [id, setid] = useState("")
  const [fulname, setful] = useState([{}])

  const getdocu = async (em) => {
    const coll = collection(firestore, "Food")
    const q = query(coll, where("Sender", "==", em))
    const snap = await getDocs(q)
    const data = []
    snap.forEach((ele) => {
      data.push(ele.data())

    })
    setful(data)

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


  const arhandel = (index) => {

    setitem(index)
  }
  const can = async (namedel) => {

    const coll = collection(firestore, "Food")
    const q = query(coll, where("id", "==", namedel))
    const snap = await getDocs(q)
    snap.forEach( async(ele) => {
      setid(ele.id)
      const del = await deleteDoc(ele.ref)
    })
    
   


  }



  return (
    <div>

      {fulname.map((ele, index) => {
        return (
          <div key={index} className={`bg-slate-400  lg:w-1/2 lg:mx-auto mx-5 mt-10 py-5 `}>
            <div className=' flex flex-row mx-3 mb-2'>
              <button
                id={index}
                onClick={() => arhandel(index)}
                className='mr-4'>
                <i id={index} className={`fa-solid fa-arrow-${(item === index) ? "down" : "up"} `}></i>
              </button>
              <span className={`mx-auto text-3xl font-bold text-slate-100 italic `}>{ele.name}</span>
              <button
                id={index}
                onClick={() => { can(ele.id) }}
                className={`p-2 rounded text-white font-bold italic bg-blue-400  hover:bg-red-600`}>
                Cancel
              </button>
            </div>
            <div className={`bg-slate-200 mx-4 ${(item === index) ? "" : "hidden"} px-4 itealic font-bold`}>
              <h1>Phone Number: <span className='underline italic text-slate-600'>{ele.phone}</span></h1>
              <h1>Category of Food: <span className='underline italic text-slate-600'>{ele.food}</span></h1>
              <h1>Location from where to pick food: <span className='underline italic text-slate-600'>{ele.Location}</span></h1>
              <h1>How much kg food is :<span className='underline italic text-slate-600'>{ele.Weight}</span></h1>
            </div>
          </div>
        )

      })}
      <h1 className='mx-auto text-center my-10 capitalize italic underline'>After cancel the request you need to refresh the page to see update</h1>
    </div>
  );
}

export default Mydonate;