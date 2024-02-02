import React, { useState } from 'react';
import { app } from '../../firebase';
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { NavLink, Link, Navigate } from "react-router-dom";

const firestore = getFirestore(app)


function Contact() {
    const [errdis, seterrdis] = useState("hidden")
    const [link, setlink] = useState("")
    const [err, seter] = useState("")
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [gender, setgender] = useState("")
    const [text, settext] = useState("")

    var handel = async () => {
        // console.log(name);
        // console.log(email);
        // console.log(text);
        // console.log(gender);
        var pattern = /^[^ ]+@[^ ]+\.[a-z]{3,3}$/

        if ((name.length > 0) && (email.match(pattern)) && (text.length > 0) && (gender.length > 0)) {

            const re = await addDoc(collection(firestore, "requests"), {
                name: name,
                email: email,
                message: text,
                gender: gender

            });
            setlink("/home")
        }else{
            seterrdis(" ");
            seter("Please Provide Valid Information & Valid Email")
        }

    }
    return (
        <div>
            <h1 className='text-center text-3xl'>Contact Us</h1>
            <div className="form flex flex-col">
                <input type="text"
                    className=' border-2 border-black  lg:w-1/2 mx-auto my-5 h-10 rounded-lg pl-4 font-sans font-semibold '
                    placeholder='Full Name'
                    value={name}
                    onChange={(e) => { setname(e.target.value) }}
                />
                <input type="email"
                    className=' border-2 border-black  lg:w-1/2 mx-auto my-5 h-10 rounded-lg pl-4 font-sans font-semibold '
                    placeholder='Email'
                    value={email}
                    onChange={(e) => { setemail(e.target.value) }}
                />
                <div className="gender lg:w-1/2 w-2/3 mx-auto">
                    <legend className='text-xl'>Gender:</legend>
                    <input type="radio"
                        name="gender" id=""
                        className='ml-5'
                        onClick={() => { setgender("Male") }}
                    />
                    <label htmlFor="">  Male</label>
                    <br />
                    <input
                        type="radio"
                        name="gender" id=""
                        className='ml-5'
                        onClick={() => { setgender("Female") }}
                    />
                    <label htmlFor="">  Female</label>
                </div>
                <textarea id="w3review" name="w3review" rows="4" cols="30" className='border-2 border-black lg:w-1/2 m-auto my-5'
                    value={text}
                    onChange={(e) => { settext(e.target.value) }}
                    placeholder='AnyProblem According to site or Any help need please type!
                    Or if youare interested in our work'
                >

                </textarea>
                <button onClick={handel} className='bg-blue-600 hover:bg-black w-20 mx-auto p-2 text-white rounded-lg font-semibold'>
                    <Link to={link}>
                        Submit
                    </Link>
                </button>
            </div>
            <h1
                className={`m-10 mx-auto p-4 border-red-900 border-4 w-1/2 bg-red-100 text-red-500 ${errdis}`}
            >{err}</h1>

        </div>
    );
}

export default Contact;