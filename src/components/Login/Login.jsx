import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase';
import logo from "./log.png"
import { Link } from "react-router-dom";

const auth = getAuth(app)


function Login() {
    const [email, setemail] = useState("")
    const [password, setpass] = useState("")
    const [err, seterr] = useState("")
    const [errdis, seterrdis] = useState("hidden")
    var handel = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Suceess");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // seterr(errorMessage);
                seterr(errorCode);
                seterrdis(" ")
            });

    }
    return (
        <div className='text-center'>
            <img src={logo} alt=""
                className='m-auto size-32'
            />
            <h1 className='text-3xl text-center font-bold '>Log In To Make World Better</h1>
            <div className='shadow-xl flex flex-col bg-blue-500 w-1/1 lg:w-1/2  rounded-lg mx-5  lg:mx-auto my-4 py-1 px-1'>
                <input type="email"
                    className=' border-2 border-black  w-3/4 mx-auto my-5 h-10 rounded-lg pl-4 font-sans font-semibold '
                    placeholder='Email'
                    value={email}
                    onChange={(e) => { setemail(e.target.value) }}
                />
                <input type="password"
                    className=' border-2 border-black  w-3/4 mx-auto my-5 h-10 rounded-lg pl-4 font-sans font-semibold '
                    placeholder='Password'
                    value={password}
                    onChange={(e) => { setpass(e.target.value) }}
                />
            </div>
            <Link to={"/signup"}
                className='hover:text-blue-400 font-bold hover:underline'
            >Dont have account to create one</Link>
            <br />
            <button onClick={handel} className='mt-3 bg-blue-400 w-20 mx-15 p-2 text-white rounded-lg font-semibold hover:bg-black'>Submit</button>
            <h1
                className={`m-10 mx-auto p-4 border-red-900 border-4 w-1/2 bg-red-100 text-red-500 ${errdis}`}
            >{err}</h1>
        </div>
    );
}

export default Login;