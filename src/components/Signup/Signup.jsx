import React, { useEffect, useState } from 'react';
import { getDatabase, set, ref } from "firebase/database"
import { NavLink, Link, Navigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase';
import { getFirestore, collection, addDoc } from "firebase/firestore"
import logo from "./log.png"

const auth = getAuth(app)
const db = getDatabase(app)
const firestore = getFirestore(app)

function Signup() {
    const [errdis, seterrdis] = useState("hidden")
 const [link,setlink] = useState("")
    const [err, seter] = useState("")
    const [email, setemail] = useState("")
    const [name, setname] = useState("")
    const [gender, setgender] = useState("")
    const [phone, setph] = useState("")
    const [year, setyear] = useState("")

    const [password, setpass] = useState("")
    var handel = async (E) => {
        E.preventDefault()



        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up 
                // console.log(userCredential);
                // ...
                const re = await addDoc(collection(firestore, "users"), {
                    name: name,
                    email: email,
                    password: password,

                });
                setlink("/")


            })
            .catch((error) => {
                seter(`${error}`)
                seterrdis(" ");
                console.log("eRR " + error);
                // window.location.href = 'http://localhost:5173/signup'


                // ..
            });












    }



    useEffect(() => {
        var pattern = /^[^ ]+@[^ ]+\.[a-z]{3,3}$/
        if (!email.match(pattern)) {
            seter("Please provide wright email")
            seterrdis(" ")
        }
        if (email.match(pattern)) {
            seter("")
            seterrdis("hidden")
        }
        if (password.length < 8) {
            seter("Please Enter password more then 8 charachters")
            seterrdis(" ")
        }
        if (name.length == 0) {
            seter("Please Enter Name")
            seterrdis(" ")
        }

    }, [email, password, name])

    return (
        <form className='text-center border-10 border-black' method='POST'>

            <h1 className='text-3xl text-center font-bold  my-20'>Sign Up</h1>
            <div className='  flex flex-col lg:w-1/2 rounded-lg w-1/1  lg:m-auto my-10 py-1 px-1 '>

                <input type="text"
                    className=' border-2 border-black  w-3/4 mx-auto my-5 h-10 rounded-lg pl-4 font-sans font-semibold '
                    placeholder='Full Name'
                    onChange={(e) => { setname(e.target.value) }}
                    value={name}

                    required
                />
                <input type="email"
                    className=' border-2 border-black  w-3/4 mx-auto my-5 h-10 rounded-lg pl-4 font-sans font-semibold '
                    placeholder='Email'
                    value={email}
                    onChange={(e) => { setemail(e.target.value) }}
                    autoComplete='off'
                    required
                />
                <input type="password"
                    className=' border-2 border-black  w-3/4 mx-auto my-5 h-10 rounded-lg pl-4 font-sans font-semibold '
                    placeholder='Password'
                    value={password}
                    onChange={(e) => { setpass(e.target.value) }}
                    required
                />

                <Link to={"/"}
                    className='hover:text-blue-400 font-bold hover:underline my-6'
                >Already Have Account</Link>

            </div>

            <button onClick={handel} className='bg-blue-400 hover:bg-black w-20 mx-15 p-2 text-white rounded-lg font-semibold'>
                <Link to={link}>
                    Submit
                </Link>

            </button>
            <img
                className='w-1/2 h-2/3 opacity-30  absolute left-1/4 top-10 -z-10'
                src={logo}
                alt="" />
            <h1
                className={`m-10 mx-auto p-4 border-red-900 border-4 w-1/2 bg-red-100 text-red-500 ${errdis}`}
            >{err}</h1>
        </form>
    );
}

export default Signup